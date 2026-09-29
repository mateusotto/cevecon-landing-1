import { copyFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// Arquivos estáticos evitam que o overlay de desenvolvimento do Vinext seja
// injetado no worker (que não possui window). Mantém a versão do npm instalada.
const require = createRequire(import.meta.url);
const source = dirname(require.resolve('maplibre-gl/package.json'));
const destination = new URL('../public/maplibre/', import.meta.url);
await mkdir(destination, { recursive: true });
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  await copyFile(join(source, 'dist', file), new URL(file, destination));
}
