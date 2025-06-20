import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const userId = request.user?.sub || 'anonymous';
    
    const now = Date.now();
    
    return next
      .handle()
      .pipe(
        tap({
          next: (data) => {
            const response = context.switchToHttp().getResponse();
            const { statusCode } = response;
            
            this.logger.log(
              `[${method}] ${url} - ${statusCode} - ${userId} - ${ip} - ${Date.now() - now}ms`,
            );
          },
          error: (error) => {
            const response = context.switchToHttp().getResponse();
            const statusCode = error?.status || 500;
            
            this.logger.error(
              `[${method}] ${url} - ${statusCode} - ${userId} - ${ip} - ${Date.now() - now}ms`,
              error.stack,
            );
          }
        }),
      );
  }
}