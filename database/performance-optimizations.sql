-- 优化数据库结构和查询性能的SQL脚本

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

CREATE INDEX IF NOT EXISTS idx_snippet_likes_user
ON snippet_likes (user_id, snippet_id);

CREATE INDEX IF NOT EXISTS idx_snippet_favorites_user
ON snippet_favorites (user_id, snippet_id);

CREATE INDEX IF NOT EXISTS idx_share_logs_snippet
ON share_logs (snippet_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_profiles_username
ON profiles (username);

-- 2. 创建复合索引优化常见查询
CREATE INDEX IF NOT EXISTS idx_snippets_composite_list
ON snippets (is_public, language, created_at DESC)
WHERE is_public = true;

CREATE INDEX IF NOT EXISTS idx_snippets_composite_popular
ON snippets (is_public, view_count DESC, like_count DESC)
WHERE is_public = true;

-- 3. 优化统计查询的视图
CREATE OR REPLACE VIEW snippet_stats AS
SELECT
  s.id,
  s.title,
  s.language,
  s.created_at,
  s.updated_at,
  s.view_count,
  s.like_count,
  COUNT(DISTINCT sl.id) as share_count,
  COUNT(DISTINCT sf.id) as favorite_count,
  p.username,
  p.avatar_url
FROM snippets s
LEFT JOIN profiles p ON s.user_id = p.id
LEFT JOIN share_logs sl ON s.id = sl.snippet_id
LEFT JOIN snippet_favorites sf ON s.id = sf.snippet_id
WHERE s.is_public = true
GROUP BY s.id, p.username, p.avatar_url;

-- 4. 创建热门内容视图（缓存复杂计算）
CREATE OR REPLACE VIEW popular_snippets AS
SELECT
  s.*,
  p.username,
  p.avatar_url,
  (
    s.view_count * 0.1 +
    s.like_count * 0.3 +
    COUNT(DISTINCT sl.id) * 0.2 +
    COUNT(DISTINCT sf.id) * 0.4
  ) as popularity_score
FROM snippets s
LEFT JOIN profiles p ON s.user_id = p.id
LEFT JOIN share_logs sl ON s.id = sl.snippet_id AND sl.created_at > NOW() - INTERVAL '30 days'
LEFT JOIN snippet_favorites sf ON s.id = sf.snippet_id
WHERE s.is_public = true
GROUP BY s.id, p.username, p.avatar_url
ORDER BY popularity_score DESC;

-- 5. 创建标签统计视图
CREATE OR REPLACE VIEW tag_statistics AS
SELECT
  t.id,
  t.name,
  t.color,
  COUNT(st.snippet_id) as snippet_count,
  COUNT(CASE WHEN s.created_at > NOW() - INTERVAL '7 days' THEN 1 END) as recent_count
FROM tags t
LEFT JOIN snippet_tags st ON t.id = st.tag_id
LEFT JOIN snippets s ON st.snippet_id = s.id AND s.is_public = true
GROUP BY t.id, t.name, t.color
ORDER BY snippet_count DESC;

-- 6. 创建函数：获取用户统计信息
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE(
  total_snippets INT,
  public_snippets INT,
  total_views INT,
  total_likes INT,
  total_favorites INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INT as total_snippets,
    COUNT(CASE WHEN is_public THEN 1 END)::INT as public_snippets,
    COALESCE(SUM(view_count), 0)::INT as total_views,
    COALESCE(SUM(like_count), 0)::INT as total_likes,
    COUNT(sf.id)::INT as total_favorites
  FROM snippets s
  LEFT JOIN snippet_favorites sf ON s.id = sf.snippet_id
  WHERE s.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql STABLE;

-- 7. 创建函数：高效的相似内容推荐
CREATE OR REPLACE FUNCTION get_similar_snippets(target_snippet_id UUID, limit_count INT DEFAULT 5)
RETURNS TABLE(
  id UUID,
  title TEXT,
  language TEXT,
  view_count INT,
  like_count INT,
  similarity_score FLOAT
) AS $$
BEGIN
  RETURN QUERY
  WITH target AS (
    SELECT language, array_agg(st.tag_id) as tag_ids
    FROM snippets s
    LEFT JOIN snippet_tags st ON s.id = st.snippet_id
    WHERE s.id = target_snippet_id
    GROUP BY s.language
  )
  SELECT
    s.id,
    s.title,
    s.language,
    s.view_count,
    s.like_count,
    (
      CASE WHEN s.language = target.language THEN 0.5 ELSE 0 END +
      CASE WHEN target.tag_ids && array_agg(st.tag_id)
           THEN array_length(target.tag_ids & array_agg(st.tag_id), 1)::FLOAT /
                GREATEST(array_length(target.tag_ids, 1), array_length(array_agg(st.tag_id), 1))
           ELSE 0 END * 0.5
    )::FLOAT as similarity_score
  FROM snippets s
  CROSS JOIN target
  LEFT JOIN snippet_tags st ON s.id = st.snippet_id
  WHERE s.id != target_snippet_id
    AND s.is_public = true
  GROUP BY s.id, s.title, s.language, s.view_count, s.like_count, target.language, target.tag_ids
  ORDER BY similarity_score DESC, s.view_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- 8. 创建触发器：自动更新统计信息
CREATE OR REPLACE FUNCTION update_snippet_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- 更新点赞数
    IF TG_TABLE_NAME = 'snippet_likes' THEN
      UPDATE snippets
      SET like_count = like_count + 1,
          updated_at = NOW()
      WHERE id = NEW.snippet_id;
    END IF;

    -- 更新分享日志时增加浏览量
    IF TG_TABLE_NAME = 'share_logs' THEN
      UPDATE snippets
      SET view_count = view_count + 1,
          updated_at = NOW()
      WHERE id = NEW.snippet_id;
    END IF;

    RETURN NEW;
  END IF;

  IF TG_OP = 'DELETE' THEN
    -- 减少点赞数
    IF TG_TABLE_NAME = 'snippet_likes' THEN
      UPDATE snippets
      SET like_count = GREATEST(like_count - 1, 0),
          updated_at = NOW()
      WHERE id = OLD.snippet_id;
    END IF;

    RETURN OLD;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
DROP TRIGGER IF EXISTS trigger_snippet_likes_stats ON snippet_likes;
CREATE TRIGGER trigger_snippet_likes_stats
  AFTER INSERT OR DELETE ON snippet_likes
  FOR EACH ROW EXECUTE FUNCTION update_snippet_stats();

DROP TRIGGER IF EXISTS trigger_share_logs_stats ON share_logs;
CREATE TRIGGER trigger_share_logs_stats
  AFTER INSERT ON share_logs
  FOR EACH ROW EXECUTE FUNCTION update_snippet_stats();

-- 9. 优化全文搜索
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_snippets_title_trgm
ON snippets USING GIN (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_snippets_content_trgm
ON snippets USING GIN (content gin_trgm_ops);

-- 10. 分区表（针对大量数据的优化）
-- 如果数据量很大，可以考虑按时间分区
/*
CREATE TABLE share_logs_2024 PARTITION OF share_logs
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE share_logs_2025 PARTITION OF share_logs
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
*/

-- 11. 数据库统计信息更新
ANALYZE;