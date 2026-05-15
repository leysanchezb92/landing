#!/usr/bin/env node
/**
 * build.mjs — Inyecta el JSON-LD de schema/*.json en los .html del root.
 *
 * Cómo funciona:
 *   1. Recorre todos los .html del directorio raíz.
 *   2. Busca bloques del tipo:
 *        <!-- JSON-LD:start NOMBRE -->
 *        <script type="application/ld+json"> ... </script>
 *        <!-- JSON-LD:end -->
 *   3. Lee schema/NOMBRE.json, valida que sea JSON parseable,
 *      y reemplaza el contenido del <script> con el JSON actualizado.
 *   4. Sobreescribe el .html en el sitio.
 *
 * Por qué hace falta:
 *   Los motores de búsqueda leen JSON-LD inline. No siguen un `src="..."`
 *   en un <script type="application/ld+json">. Para tener una sola fuente
 *   de verdad (schema/*.json) sin perder SEO, se inyecta en build time.
 *
 * Uso:
 *   $ npm run build
 *   o:
 *   $ node build.mjs
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT       = dirname(fileURLToPath(import.meta.url));
const SCHEMA_DIR = join(ROOT, 'schema');

const BLOCK_RE = /<!--\s*JSON-LD:start\s+([\w-]+)\s*-->[\s\S]*?<!--\s*JSON-LD:end\s*-->/g;

const log = {
  info:  (m) => console.log('·', m),
  ok:    (m) => console.log('\x1b[32m✓\x1b[0m', m),
  warn:  (m) => console.log('\x1b[33m!\x1b[0m', m),
  error: (m) => console.error('\x1b[31m✗\x1b[0m', m)
};

async function listHtml() {
  const files = await readdir(ROOT, { withFileTypes: true });
  return files
    .filter(f => f.isFile() && f.name.endsWith('.html'))
    .map(f => f.name);
}

async function loadSchema(name) {
  const file = join(SCHEMA_DIR, name + '.json');
  const txt  = await readFile(file, 'utf8');
  // Valida que el JSON parsea — lanza si no.
  JSON.parse(txt);
  return { file, txt: txt.replace(/\s+$/, '') };
}

function buildReplacement(name, jsonText) {
  return (
    '<!-- JSON-LD:start ' + name + ' -->\n' +
    '<script type="application/ld+json">\n' +
    jsonText + '\n' +
    '</script>\n' +
    '<!-- JSON-LD:end -->'
  );
}

async function processHtml(htmlFile) {
  const path = join(ROOT, htmlFile);
  let src    = await readFile(path, 'utf8');

  const matches = [...src.matchAll(BLOCK_RE)];
  if (matches.length === 0) {
    log.info('sin bloques JSON-LD: ' + htmlFile);
    return { file: htmlFile, blocks: 0, changed: false };
  }

  let updated = src;
  let changedAny = false;

  for (const m of matches) {
    const name = m[1];
    let schema;
    try {
      schema = await loadSchema(name);
    } catch (err) {
      log.error(htmlFile + ' → schema/' + name + '.json: ' + err.message);
      throw err;
    }
    const replacement = buildReplacement(name, schema.txt);
    if (m[0] !== replacement) changedAny = true;
    updated = updated.replace(m[0], replacement);
  }

  if (changedAny) {
    await writeFile(path, updated, 'utf8');
    log.ok(htmlFile + ' (' + matches.length + ' bloque' + (matches.length === 1 ? '' : 's') + ')');
  } else {
    log.info('sin cambios: ' + htmlFile);
  }

  return { file: htmlFile, blocks: matches.length, changed: changedAny };
}

async function main() {
  const start = Date.now();
  log.info('Buscando archivos HTML en: ' + ROOT);
  log.info('Esquemas JSON en:          ' + SCHEMA_DIR);
  console.log();

  const htmls = await listHtml();
  let total = 0;
  let touched = 0;

  for (const f of htmls) {
    const res = await processHtml(f);
    total += res.blocks;
    if (res.changed) touched++;
  }

  console.log();
  log.ok('Listo. ' + total + ' bloque(s) procesado(s) en ' +
         touched + ' archivo(s) modificado(s). (' +
         (Date.now() - start) + ' ms)');
}

main().catch(err => {
  log.error(err.stack || err.message);
  process.exit(1);
});
