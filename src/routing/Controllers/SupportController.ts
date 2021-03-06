import {Controller, Get, Authorized, CurrentUser, Res} from "routing-controllers";
import {CompanyUser} from '../../models';

@Controller('/support')
export class SupportController {
  @Get('/')
  @Authorized()
  get(@CurrentUser() user, @Res() res) {
    if(user instanceof CompanyUser) {
      res.render('pages/support/company');
      return res;
    }

    res.render('pages/support/student');
    return res;
  }
}