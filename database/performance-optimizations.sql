-- 优化数据库结构和查询性能的SQL脚本
-- HTMLShare V3 - 简化版本 (移除社交功能)

-- 1. 创建性能优化的索引
CREATE INDEX IF NOT EXISTS idx_snippets_public_created
ON snippets (is_public, created_at DESC)
WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_snippets_user_created
ON snippets (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_snippets_language
ON snippets (language)
WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_snippets_featured
ON snippets (is_featured, created_at DESC)
WHERE is_featured = true AND is_public = true;

CREATE INDEX IF NOT EXISTS idx_snippets_search
ON snippets USING GIN (to_tsvector('english', title || ' ' || coalesce(description, '') || ' ' || content));

CREATE INDEX IF NOT EXISTS idx_snippet_tags_snippet
ON snippet_tags (snippet_id);

CREATE INDEX IF NOT EXISTS idx_snippet_tags_tag
ON snippet_tags (tag_id);

CREATE INDEX IF NOT EXISTS idx_profiles_username
ON profiles (username);

CREATE INDEX IF NOT EXISTS idx_comments_snippet
ON comments (snippet_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comments_user
ON comments (user_id, created_at DESC);

-- 2. 创建复合索引优化常见查询
CREATE INDEX IF NOT EXISTS idx_snippets_composite_list
ON snippets (is_public, language, created_at DESC)
WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_snippets_composite_popular
ON snippets (is_public, view_count DESC)
WHERE is_public = true;

-- 3. 优化统计查询的视图
CREATE OR REPLACE VIEW snippet_stats AS
SELECT
  s.id,
  s.title,
  s.language,
  s.description,
  s.created_at,
  s.updated_at,
  s.view_count,
  COUNT(DISTINCT c.id) as comment_count,
  p.username,
  p.avatar_url
FROM snippets s
LEFT JOIN profiles p ON s.user_id = p.id
LEFT JOIN comments c ON s.id = c.snippet_id
WHERE s.is_public = true
GROUP BY s.id, p.username, p.avatar_url;

-- 4. 创建热门代码片段的物化视图
CREATE MATERIALIZED VIEW IF NOT EXISTS popular_snippets AS
SELECT
  s.id,
  s.title,
  s.language,
  s.description,
  s.view_count,
  s.created_at,
  p.username,
  p.avatar_url,
  COUNT(DISTINCT c.id) as comment_count,
  (
    s.view_count * 0.7 +
    COUNT(DISTINCT c.id) * 0.3
  ) as popularity_score
FROM snippets s
LEFT JOIN profiles p ON s.user_id = p.id
LEFT JOIN comments c ON s.id = c.snippet_id
WHERE s.is_public = true
GROUP BY s.id, p.username, p.avatar_url
ORDER BY popularity_score DESC, s.created_at DESC;

-- 创建唯一索引用于并发刷新
CREATE UNIQUE INDEX IF NOT EXISTS idx_popular_snippets_unique
ON popular_snippets (id);

-- 5. 用户统计函数
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
  total_snippets INT,
  public_snippets INT,
  total_views INT,
  total_comments INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(s.id)::INT as total_snippets,
    COUNT(CASE WHEN is_public THEN 1 END)::INT as public_snippets,
    COALESCE(SUM(view_count), 0)::INT as total_views,
    COUNT(c.id)::INT as total_comments
  FROM snippets s
  LEFT JOIN comments c ON s.id = c.snippet_id
  WHERE s.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. 相似代码片段推荐函数
CREATE OR REPLACE FUNCTION get_similar_snippets(
  target_snippet_id UUID,
  limit_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  language TEXT,
  view_count INT,
  similarity_score FLOAT
) AS $$
DECLARE
  target RECORD;
BEGIN
  -- 获取目标代码片段信息
  SELECT s.language, array_agg(st.tag_id) as tag_ids
  INTO target
  FROM snippets s
  LEFT JOIN snippet_tags st ON s.id = st.snippet_id
  WHERE s.id = target_snippet_id
  GROUP BY s.id, s.language;

  RETURN QUERY
  SELECT
    s.id,
    s.title,
    s.language,
    s.view_count,
    (
      CASE WHEN s.language = target.language THEN 0.5 ELSE 0 END +
      COALESCE(
        (SELECT COUNT(*) FROM unnest(target.tag_ids)
         INTERSECT
         SELECT tag_id FROM snippet_tags WHERE snippet_id = s.id) * 0.3, 0
      ) +
      CASE WHEN s.view_count > 10 THEN 0.2 ELSE 0 END
    ) as similarity_score
  FROM snippets s
  WHERE s.id != target_snippet_id
    AND s.is_public = true
  GROUP BY s.id, s.title, s.language, s.view_count, target.language, target.tag_ids
  ORDER BY similarity_score DESC, s.view_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. 定期维护脚本
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
BEGIN
  -- 刷新物化视图
  REFRESH MATERIALIZED VIEW CONCURRENTLY popular_snippets;

  -- 分析表以更新统计信息
  ANALYZE snippets;
  ANALYZE profiles;
  ANALYZE comments;
  ANALYZE tags;
  ANALYZE snippet_tags;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. 清理过期数据的函数
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
  -- 这里可以添加清理逻辑，比如删除很老的匿名代码片段等
  -- DELETE FROM snippets WHERE user_id IS NULL AND created_at < NOW() - INTERVAL '1 year';

  -- 记录清理操作
  RAISE NOTICE 'Cleanup completed at %', NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;