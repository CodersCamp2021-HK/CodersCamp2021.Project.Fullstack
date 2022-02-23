import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
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

export { NullInterceptor };
