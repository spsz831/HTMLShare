import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    mode: "advanced",
    functionPerRoute: false
  }),
  integrations: [tailwind()],
  server: {
    port: 3000,
    host: true
  }
});