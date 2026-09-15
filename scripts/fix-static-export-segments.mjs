// Workaround for a Windows-only bug in Next.js 16.3.5 static export: segment prefetch files are
// written as out/<route>/__next.<route>/__PAGE__.txt (backslash path from path.relative) instead of
// the flat out/<route>/__next.<route>.__PAGE__.txt the client router requests. Linux builds are
// already flat, so this script finds nothing to do there. Remove once Next.js fixes the export.
import { readdir, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';

async function listFiles(dir, prefix = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? listFiles(join(dir, entry.name), [...prefix, entry.name])
        : [[...prefix, entry.name]],
    ),
  );
  return files.flat();
}

async function flatten(dir) {
  let moved = 0;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (entry.name.startsWith('__next.')) {
      for (const parts of await listFiles(path)) {
        await rename(join(path, ...parts), join(dir, [entry.name, ...parts].join('.')));
        moved += 1;
      }
      await rm(path, { recursive: true, force: true });
    } else {
      moved += await flatten(path);
    }
  }
  return moved;
}

const outDir = process.argv[2] ?? 'out';
const moved = await flatten(outDir);
if (moved > 0)
  console.log(`fix-static-export-segments: flattened ${moved} segment file(s) in ${outDir}`);
