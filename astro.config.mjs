import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://mindshare.quip.network',
  output: 'server',
  adapter: netlify({
    imageCDN: false,
    devFeatures: {
      images: false,
      environmentVariables: false,
      edgeFunctions: false,
    },
  }),
  session: false,
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: { target: 'es2022' },
  },
});
