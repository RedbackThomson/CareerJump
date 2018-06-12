import {Controller, Get, Authorized, CurrentUser, Res} from "routing-controllers";
import {CompanyUser} from '../../models';

@Controller('/billing')
export class BillingController {
  @Get('/')
  @Authorized()
  get(@CurrentUser() user, @Res() res) {
    if(user instanceof CompanyUser && user.admin) {
      res.render('pages/billing/company');
      return res;
    }

    return res;
  }
}