import 'reflect-metadata';

import * as fs from 'fs/promises';
import * as path from 'path';
import * as prettier from 'prettier';

import { appFactory } from '../src/AppFactory';
import { createSwaggerDocument } from '../src/config';

const GENERATED_FILENAME = 'api.spec.json';
const GENERATED_PATH_SDK = path.join(__dirname, '..', '..', 'sdk', GENERATED_FILENAME);

async function main() {
  console.log(`Start generating OpenAPI Specification 
- sdk: ${GENERATED_PATH_SDK}
`);
  const options = await prettier.resolveConfig(path.join(__dirname));
  const app = await appFactory({ logger: false });
  const document = createSwaggerDocument(app);
  const formatted = prettier.format(JSON.stringify(document), { ...options, parser: 'json' });
  await fs.writeFile(GENERATED_PATH_SDK, formatted);
  console.log('OpenAPI Specification generated 🎉🎉🎉');
  await app.close();
}

main();
