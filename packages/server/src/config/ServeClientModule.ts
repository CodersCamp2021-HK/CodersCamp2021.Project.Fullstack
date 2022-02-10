import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const ServeClientModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', '..', '..', '..', 'client', 'dist'),
  exclude: ['/api*'],
});

export { ServeClientModule };
