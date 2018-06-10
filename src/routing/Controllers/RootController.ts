import {Controller, Param, Body, Get, Authorized, Res} from "routing-controllers";

@Controller()
export class RootController {
  @Get('/')
  get(@Res() res) {
    return res.render("index");
  }
}