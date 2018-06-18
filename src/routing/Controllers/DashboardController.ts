import {Response} from 'express';
import {Controller, Get, Authorized, CurrentUser, Res} from "routing-controllers";
import { CompanyUser, StudentUser, Fair } from '../../models';
import { FairManager } from '../../managers/FairManager';

@Controller('/dashboard')
export class DashboardController {
  @Get('/')
  @Authorized()
  get(@CurrentUser() user, @Res() res) {
    if(user instanceof CompanyUser) {
      return this.getCompany(user, res);
    }
    return this.getStudent(user, res);
  }

  getCompany(user: CompanyUser, res: Response) {
    let query;

    // Show admins all of their companies fairs;
    if (user.admin) {
      query = FairManager.getFairsByCompany(user.companyId)
    } else {
      query = FairManager.getFairsByAttendingUser(user.id);
    }

    return query
      .then((fairs: Fair[]) => {
        res.render('pages/dashboard/company', {
          fairs
        });
        return res;
      });
  }

  getStudent(user: StudentUser, res: Response) {
    return FairManager.getFairsByStudent(user.id)
      .then((fairs: Fair[]) => {
        res.render('pages/dashboard/student', {
          fairs
        });
        return res;
      });
  }
}