import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { logger } from '../../config/logging';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  isProduction = process.env.NODE_ENV === 'production';

  error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (!res.headersSent) {
      res.status(error.httpCode || 500);

      res.json({
        name: error.name,
        message: error.message,
        errors: error['errors'] || [],
      });
    }

    if (this.isProduction) {
      logger.error(error.message);
    } else {
      logger.error(error.stack);
    }
  }
}