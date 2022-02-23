import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs/operators';

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

export { UndefinedInterceptor };
