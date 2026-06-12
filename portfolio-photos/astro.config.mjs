import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://photos.your-domain.com',

  image: {
    // sharp is bundled with Astro 4 — no separate install needed
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  output: "hybrid",
  adapter: cloudflare()
});