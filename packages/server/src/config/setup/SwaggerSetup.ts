import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { TagMap } from '../../shared';
import { env } from '../Env';

const APP_NAME = 'JeszCoChcesz';

type SwaggerDocumentConfig = Readonly<{
  title: string;
  description: string;
  externalDoc: { description: string; url: string };
  version: string;
  path: string;
}>;

type SwaggerConfig = Readonly<{
  document: SwaggerDocumentConfig;
  ui: SwaggerCustomOptions;
}>;

const defaultSwaggerDocumentConfig: SwaggerDocumentConfig = Object.freeze({
  title: `${APP_NAME} API 🍲🍝🍜`,
  description: `
${APP_NAME} is an online food delivery system connecting restaurants with health-conscious users.
The app automatically sums up all of the nutritional values helping you stick to your diet.
`,
  externalDoc: {
    description: 'CodersCamp 2021 - Project Fullstack - GitHub',
    url: 'https://github.com/CodersCamp2021-HK/CodersCamp2021.Project.Fullstack',
  },
  version: '1.0.0',
  path: 'api',
});

const defaultSwaggerCustomOptions: SwaggerCustomOptions = Object.freeze({
  customSiteTitle: `${APP_NAME} API Docs`,
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
    .addCookieAuth(env.ACCESS_TOKEN_NAME)
    .setTitle(config.title)
    .setDescription(config.description)
    .setExternalDoc(config.externalDoc.description, config.externalDoc.url)
    .setVersion(config.version)
    .build();
  const document = SwaggerModule.createDocument(app, documentBase);
  if (document.tags) {
    document.tags.push(...getTags());
  }
  return document;
}

function setupSwagger(app: INestApplication, document: OpenAPIObject, config: SwaggerConfig = defaultSwaggerConfig) {
  SwaggerModule.setup(config.document.path, app, document, config.ui);
  return app;
}

export { createSwaggerDocument, setupSwagger };
