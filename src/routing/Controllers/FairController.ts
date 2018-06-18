import {Response} from 'express';
import {Controller, Get, Authorized, CurrentUser, Res, Param} from "routing-controllers";
import { CompanyUser, Interview, StudentUser, Fair, FairAttendance } from '../../models';
import { InterviewManager } from '../../managers/InterviewManager';
import { FairManager } from '../../managers/FairManager';

@Controller('/fairs')
export class FairController {
  @Get('/:fairName')
  @Authorized()
  get(@Param('fairName') fairName: string, @CurrentUser() user, @Res() res) {
    return FairManager.getFairByAlias(fairName)
      .then((fair: Fair) => {
        if(user instanceof CompanyUser) {
          return this.getCompany(fair, user, res);
        }
        return this.getStudent(fair, user, res);
      });
  }

  getCompany(fair: Fair, user: CompanyUser, res: Response): Response | PromiseLike<Response> {
    if (user.admin) {
      return this.getCompanyAdmin(fair, user, res);
    }

    return InterviewManager.getInterviewsByInterviewers(fair.id, [user])
      .then(interviews => {
        res.render('pages/fair/company', {
          fair,
          interviews: interviews
        });
        return res;
      });
  }

  getCompanyAdmin(fair: Fair, user: CompanyUser, res: Response): Response | PromiseLike<Response> {
    let _interviewers: CompanyUser[] = [];
    let _attendance: FairAttendance;

    return InterviewManager.getInterviewersByCompany(fair.id, user.companyId)
      .then((interviewers: CompanyUser[]) => {
        _interviewers = interviewers;
        return FairManager.getAttendance(fair.id, user.companyId);
      })
      .then((attendance: FairAttendance) => {
        _attendance = attendance;
        return InterviewManager.getInterviewsByInterviewers(fair.id, _interviewers);
      })
      .then((interviews: Interview[]) => {
        res.render('pages/fair/company', {
          fair,
          attendance: _attendance,
          interviewers: _interviewers,
          interviews: interviews
        });
        return res;
      });
  }

  getStudent(fair: Fair, user: StudentUser, res: Response): Response | PromiseLike<Response> {
    return InterviewManager.getInterviewsByStudent(fair.id, user.id)
      .then((interviews: Interview[]) => {
        res.render("pages/fair/student", {
          fair,
          interviews
        });
        return res;
      });
  }
}