import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import hostingConfig from './.openai/hosting.json';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';
// Windows can reject native fs.watch handles while image files are being copied.
const needsPolling = process.platform === 'win32' || isCodexSeatbeltSandbox;

const localBindingConfig = {
  main: 'vinext/server/fetch-handler',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  const isVercel = process.env.VERCEL === '1' || process.env.NITRO_PRESET === 'vercel';
  const hostingPlugin = isVercel
    ? nitro({ preset: 'vercel' })
    : (await import('@cloudflare/vite-plugin')).cloudflare({
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        config: localBindingConfig,
      });

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    // Resolve CSS package imports before the server environment externalizes them.
    ...(isVercel ? { resolve: { alias: [
      { find: /^tailwindcss$/, replacement: fileURLToPath(new URL('./node_modules/tailwindcss/index.css', import.meta.url)) },
      { find: /^tw-animate-css$/, replacement: fileURLToPath(new URL('./node_modules/tw-animate-css/dist/tw-animate.css', import.meta.url)) },
      { find: /^shadcn\/tailwind.css$/, replacement: fileURLToPath(new URL('./node_modules/shadcn/dist/tailwind.css', import.meta.url)) },
    ] } } : {}),
    server: {
      watch: {
        ...(needsPolling
          ? { useFsEvents: false, usePolling: true, interval: 300, binaryInterval: 1000 }
          : {}),
      },
    },
    plugins: [vinext(), sites(), hostingPlugin],
  };
});
