import {Router, Request, Response, NextFunction} from 'express';
import {Controller, Param, Body, Get} from "routing-controllers";

@Controller()
export class RoomRouter {
  @Get('/room')
  get() {
    return "Hello World";
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