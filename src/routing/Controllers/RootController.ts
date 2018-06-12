import {Controller, Get, Res, CurrentUser} from "routing-controllers";

@Controller('/')
export class RootController {
  @Get('/')
  get(@Res() res) {
    res.render("index");
    return res;
  }
}