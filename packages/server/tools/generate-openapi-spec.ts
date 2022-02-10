import 'reflect-metadata';

import * as fs from 'fs/promises';
import * as path from 'path';
import * as prettier from 'prettier';

import { appFactory } from '../src/app.factory';
import { createSwaggerDocument } from '../src/config';

const GENERATED_FILENAME = 'api.spec.json';
const GENERATED_PATH = path.join(__dirname, '..', '..', 'sdk', GENERATED_FILENAME);

async function main() {
  console.log(`Start generating OpenAPI Specification ${GENERATED_PATH}`);
  const options = await prettier.resolveConfig(path.join(__dirname));
  const app = await appFactory();
  const document = createSwaggerDocument(app);
  await fs.writeFile(GENERATED_PATH, prettier.format(JSON.stringify(document), { ...options, parser: 'json' }));
  console.log('OpenAPI Specification generated 🎉🎉🎉');
  await app.close();
}

main();
