import { applyDecorators, Controller, Logger } from '@nestjs/common';
import { ApiConsumes, ApiDefaultResponse, ApiProduces, ApiTags } from '@nestjs/swagger';

import { DefaultResponseDto } from '../dtos';

type ApiControllerOptions = { path: string; name?: string; description?: string };

type TagMetadata = Readonly<{ description?: string }>;

const TagMap = new Map<string, TagMetadata>();

function ApiController({ path, name, description }: ApiControllerOptions): ClassDecorator {
  const rname = name ?? path;
  if (TagMap.has(rname)) {
    Logger.error(`Reasignment of tag ${rname}`, ApiController.name);
  }
  TagMap.set(rname, { description });
  return applyDecorators(
    ApiTags(rname),
    Controller(path),
    ApiConsumes('application/json'),
    ApiProduces('application/json'),
    ApiDefaultResponse({ type: DefaultResponseDto }),
  );
}

export { ApiController, TagMap };
