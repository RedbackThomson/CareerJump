import {Router, Request, Response, NextFunction} from 'express';

//import {isAuthenticated, getInterview} from './helpers';
import {BaseRouter} from './BaseRouter';

export class RoomRouter extends BaseRouter {
  constructor() {
    super();
    // this.buildRoutes();
  }

  // public async getRoom(req: Request, res: Response, next: NextFunction) {
  //   return res.render('pages/room', {
  //     interview: req.interview
  //   });
  // }

  // private buildRoutes() {
  //   this.router.get('/:roomName', isAuthenticated,
  //     getInterview(models, 'roomName'), this.getRoom);
  // }
}