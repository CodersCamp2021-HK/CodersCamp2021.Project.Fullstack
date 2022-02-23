import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { TagMap } from '../../shared';

type SwaggerDocumentConfig = Readonly<{
  title: string;
  description: string;
  version: string;
  path: string;
}>;

type SwaggerConfig = Readonly<{
  document: SwaggerDocumentConfig;
  ui: SwaggerCustomOptions;
}>;

const defaultSwaggerDocumentConfig: SwaggerDocumentConfig = Object.freeze({
  title: 'App example',
  description: 'The app API description',
  version: '1.0.0',
  path: 'api',
});

const defaultSwaggerCustomOptions: SwaggerCustomOptions = Object.freeze({
  customSiteTitle: 'Fullstack API Docs',
  swaggerOptions: {
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
  },
});

const defaultSwaggerConfig: SwaggerConfig = Object.freeze({
  document: defaultSwaggerDocumentConfig,
  ui: defaultSwaggerCustomOptions,
});

function getTags() {
  return [...TagMap.entries()]
    .map(([name, metadata]) =>
      metadata.description
        ? {
            name,
            description: metadata.description,
          }
        : undefined,
    )
    .filter((x): x is Readonly<{ name: string; description: string }> => x !== undefined);
}

function createSwaggerDocument(app: INestApplication, config: SwaggerDocumentConfig = defaultSwaggerDocumentConfig) {
  const documentBase = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .build();
  const document = SwaggerModule.createDocument(app, documentBase);
  if (document.tags) {
    document.tags.push(...getTags());
  }
  return document;
}

function setupSwagger(app: INestApplication, config: SwaggerConfig = defaultSwaggerConfig) {
  const document = createSwaggerDocument(app, config.document);
  SwaggerModule.setup(config.document.path, app, document, config.ui);
  return app;
}

export { createSwaggerDocument, setupSwagger };
