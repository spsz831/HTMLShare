-- HTMLShare Astro - Cloudflare D1 Database Schema
-- Migration from Supabase to D1

-- Pages table - core HTML content storage
CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL DEFAULT 'Shared HTML',
    content TEXT NOT NULL,
    language TEXT DEFAULT 'html',
    description TEXT,
    view_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Users table (simplified version for future extension)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Tags table for content categorization
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id INTEGER,
    tag_name TEXT NOT NULL,
    FOREIGN KEY (page_id) REFERENCES pages (id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_pages_url_id ON pages(url_id);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at);
CREATE INDEX IF NOT EXISTS idx_pages_public ON pages(is_public);
CREATE INDEX IF NOT EXISTS idx_tags_page_id ON tags(page_id);

-- Insert some demo data
INSERT OR IGNORE INTO pages (url_id, title, content, language, description) VALUES
('demo-card', 'Card Demo', '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Card Demo</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; margin: 20px auto; }
        .card h2 { color: #333; margin-top: 0; }
        .card p { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Welcome to HTMLShare</h2>
        <p>This is a demo card showing how HTML content is rendered directly without iframe.</p>
        <p>You can now use <code>class="card"</code> and it will work perfectly!</p>
    </div>
</body>
</html>', 'html', 'Demonstrates card CSS class support');