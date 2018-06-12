import {Router, Request, Response, NextFunction} from 'express';
import {Controller, Param, Body, Get, Authorized, CurrentUser, Res} from "routing-controllers";
import { AUTH_TYPES } from '../../managers/AuthManager';
import { CompanyUser, Interview, StudentUser } from '../../models';
import { InterviewManager } from '../../managers/InterviewManager';

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
    if (user.admin) {
      return this.getCompanyAdmin(user, res);
    }

    return InterviewManager.getInterviewsByInterviewers([user])
      .then(interviews => {
        res.render('pages/dashboard/company', {
          interviews: interviews
        });
        return res;
      });
  }

  getCompanyAdmin(user: CompanyUser, res: Response) {
    let _interviewers: CompanyUser[] = [];

    return InterviewManager.getInterviewersByCompany(user.companyId)
      .then((interviewers: CompanyUser[]) => {
        _interviewers = interviewers;
        return InterviewManager.getInterviewsByInterviewers(interviewers);
      })
      .then((interviews: Interview[]) => {
        res.render('pages/dashboard/company', {
          interviewers: _interviewers,
          interviews: interviews
        });
        return res;
      });
  }

  getStudent(user: StudentUser, res: Response) {
    return InterviewManager.getInterviewsByStudent(user.id)
      .then((interviews: Interview[]) => {
        return res.render("pages/dashboard/student", {
          interviews
        });
      });
  }
}