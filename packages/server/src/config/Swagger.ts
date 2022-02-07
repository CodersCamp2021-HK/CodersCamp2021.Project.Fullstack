import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

type SwaggerDocumentConfig = Readonly<{
  title: string;
  description: string;
  version: string;
  path: string;
}>;

type SwaggerConfig = Readonly<{
  document: SwaggerDocumentConfig,
  ui: SwaggerCustomOptions
}>

const defaultSwaggerDocumentConfig: SwaggerDocumentConfig = Object.freeze({
  title: 'App example',
  description: 'The app API description',
  version: '1.0.0',
  path: 'api'
});

const defaultSwaggerCustomOptions: SwaggerCustomOptions = Object.freeze({
  customSiteTitle: 'Fullstack API Docs'
});

const defaultSwaggerConfig: SwaggerConfig = Object.freeze({
  document: defaultSwaggerDocumentConfig,
  ui: defaultSwaggerCustomOptions
});

function createSwaggerDocument(
  app: INestApplication,
  config: SwaggerDocumentConfig
) {
  const document = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .build();
  return SwaggerModule.createDocument(app, document);
}

function setupSwagger(
  app: INestApplication,
  config: SwaggerConfig = defaultSwaggerConfig
) {
  app.setGlobalPrefix(config.document.path);
  const document = createSwaggerDocument(app, config.document);
  SwaggerModule.setup(config.document.path, app, document, config.ui);
  return app;
}

export { setupSwagger, createSwaggerDocument };