#!/usr/bin/env node
/**
 * Migration script: Supabase to Cloudflare D1
 * This script helps migrate data from your current Supabase database to Cloudflare D1
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const OUTPUT_FILE = 'migration-data.sql';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Generate URL ID from content (matching new system)
function generateUrlId(content) {
  const timestamp = Date.now().toString();
  const hash = crypto.createHash('md5').update(content + timestamp).digest('hex');
  return hash.substring(0, 12);
}

// Escape SQL string
function escapeSQL(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

async function migrateData() {
  try {
    console.log('🚀 Starting migration from Supabase to Cloudflare D1...');

    // Fetch all snippets from Supabase
    const { data: snippets, error } = await supabase
      .from('snippets')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!snippets || snippets.length === 0) {
      console.log('ℹ️ No data found to migrate');
      return;
    }

    console.log(`📊 Found ${snippets.length} snippets to migrate`);

    // Generate SQL INSERT statements
    const sqlStatements = [];
    const skippedItems = [];

    for (const snippet of snippets) {
      try {
        // Only migrate HTML content
        if (snippet.language !== 'html') {
          skippedItems.push({
            id: snippet.id,
            reason: `Non-HTML content (${snippet.language})`
          });
          continue;
        }

        // Generate new URL ID for the migrated content
        const urlId = generateUrlId(snippet.content);

        // Create INSERT statement
        const sql = `INSERT INTO pages (url_id, title, content, language, description, view_count, is_public, created_at) VALUES (
  ${escapeSQL(urlId)},
  ${escapeSQL(snippet.title || 'Migrated Content')},
  ${escapeSQL(snippet.content)},
  'html',
  ${escapeSQL(snippet.description)},
  ${snippet.view_count || 0},
  ${snippet.is_public ? 1 : 0},
  ${escapeSQL(snippet.created_at)}
);`;

        sqlStatements.push(sql);

        // Log progress
        if (sqlStatements.length % 100 === 0) {
          console.log(`📝 Processed ${sqlStatements.length} items...`);
        }

      } catch (itemError) {
        skippedItems.push({
          id: snippet.id,
          reason: `Processing error: ${itemError.message}`
        });
      }
    }

    // Create migration file
    const migrationContent = `-- HTMLShare Migration from Supabase to Cloudflare D1
-- Generated on: ${new Date().toISOString()}
-- Total items: ${sqlStatements.length}
-- Skipped items: ${skippedItems.length}

-- Begin transaction
BEGIN;

${sqlStatements.join('\n\n')}

-- Commit transaction
COMMIT;

${skippedItems.length > 0 ? `
-- Skipped items (${skippedItems.length}):
${skippedItems.map(item => `-- ID ${item.id}: ${item.reason}`).join('\n')}
` : ''}`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, migrationContent, 'utf8');

    console.log(`✅ Migration file created: ${OUTPUT_FILE}`);
    console.log(`📊 Successfully processed: ${sqlStatements.length} items`);

    if (skippedItems.length > 0) {
      console.log(`⚠️ Skipped: ${skippedItems.length} items (see comments in SQL file)`);
    }

    console.log(`\n🔧 Next steps:`);
    console.log(`1. Review the ${OUTPUT_FILE} file`);
    console.log(`2. Run: npx wrangler d1 execute htmlshare-db --file=${OUTPUT_FILE}`);
    console.log(`3. Test your new Astro application`);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrateData();