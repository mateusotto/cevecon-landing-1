import { copyFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const source = dirname(require.resolve('pannellum/package.json'));
const destination = new URL('../public/panorama/', import.meta.url);
await mkdir(destination, { recursive: true });
for (const file of ['pannellum.js', 'pannellum.css']) {
  await copyFile(join(source, 'build', file), new URL(file, destination));
}
