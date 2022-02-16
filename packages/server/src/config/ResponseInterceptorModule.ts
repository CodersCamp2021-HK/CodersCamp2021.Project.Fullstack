import { CallHandler, ExecutionContext, HttpStatus, Module, NestInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Response } from 'express';
import { map } from 'rxjs/operators';

class NullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data === null) {
          const http = context.switchToHttp();
          const res = http.getResponse<Response>();
          res.status(HttpStatus.NOT_FOUND);
        }

        return data;
      }),
    );
  }
}

class UndefinedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data === undefined) {
          const http = context.switchToHttp();
          const res = http.getResponse<Response>();
          res.status(HttpStatus.NO_CONTENT);
        }

        return data;
      }),
    );
  }
}

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: NullInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UndefinedInterceptor,
    },
  ],
})
class ResponseInterceptorModule {}

export { ResponseInterceptorModule };
