import {Controller, Param, Body, Get, Authorized, CurrentUser, Res} from "routing-controllers";
import { CompanyUser, Skillset} from '../../models';

@Controller('/profile')
export class ProfileController {
  @Get('/')
  @Authorized()
  get(@CurrentUser() user, @Res() res) {
    if(user instanceof CompanyUser) {
      return res.render('pages/profile/company');
    }
    
    return Skillset.findAll()
      .then((skillsets: Skillset[]) => res.render('pages/profile/student', {
        user,
        skillsets
      }));
  }
}