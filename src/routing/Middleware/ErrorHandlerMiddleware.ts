import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { logger } from '../../config/logging';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  isProduction = process.env.NODE_ENV === 'production';

  error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
    if(error.httpCode === 401) {
      return this.redirectUnauthorised(res);
    }

    logger.error(error.message);

    if (!res.headersSent) {
      res.status(error.httpCode || 500);

      if (this.isProduction) {
        res.json({
          name: error.name,
          message: error.message,
          errors: error['errors'] || [],
        });
      } else {
        this.textError(error, req, res);
      }
    }
  }

  redirectUnauthorised(res: express.Response) {
    res.redirect('/login');
  }

  textError(error: HttpError, req: express.Request, res: express.Response): void {
    logger.error(error.stack);
    res.render("errors/index", {
      status: error.httpCode,
      error: error.stack
    });
  }
}