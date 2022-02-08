import "reflect-metadata";
import { createSwaggerDocument } from '../src/config';
import * as path from 'path';
import { appFactory } from '../src/App.factory';
import * as fs from 'fs/promises';

const GENERATED_FILENAME = 'api.spec.json';
const GENERATED_PATH = path.join(
  __dirname,
  `../../sdk/${GENERATED_FILENAME}`,
);

async function main() {
  console.log(`Start generating OpenAPI Specification ${GENERATED_PATH}`);
  const app = await appFactory();
  const document = createSwaggerDocument(app);
  await fs.writeFile(GENERATED_PATH, JSON.stringify(document));
  console.log('OpenAPI Specification generated 🎉🎉🎉');
  process.exit();
}

main();
