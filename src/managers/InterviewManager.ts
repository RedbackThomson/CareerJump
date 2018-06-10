import { Interview, Company, StudentProfile, Fair, CompanyUser, StudentUser } from "../models";
import { Op } from "sequelize";

export class InterviewManager {
  static getInterviewersByCompany(companyId): PromiseLike<CompanyUser[]> {
    return CompanyUser.findAll({
      where: {companyId: companyId}
    });
  }

  static getInterviewByRoom(roomName: string): Promise<Interview> {
    return new Promise((resolve, reject) => {
      let _interview: Interview;

      Interview.findOne({
        where: {roomName: roomName},
        include: [{
          model: Fair,
          as: 'fair'
        }, {
          model: CompanyUser,
          as: 'companyUser'
        }, {
          model: StudentUser,
          as: 'studentUser'
        }]
      })
        .then((interview: Interview) => {
          _interview = interview;
          return interview.companyUser.$get('company');
        })
        .then((company: Company) => {
          _interview.companyUser.company = company;
          return _interview.studentUser.$get('profile');
        })
        .then((profile: StudentProfile) => {
          _interview.studentUser.profile = profile;
          return resolve(_interview);
        })
        .catch(reject);
    })
  }

  static getInterviewsByInterviewers(interviewers: CompanyUser[]): PromiseLike<Interview[]> {
    let userIds = interviewers.map(user => user.id);
    let _interviews;

    return Interview.findAll({
      where: {
        companyUserId: {
          [Op.or]: userIds
        }
      },
      include: [{
        model: Fair,
        as: 'fair'
      }, {
        model: StudentUser,
        as: 'studentUser'
      }, {
        model: CompanyUser,
        as: 'companyUser'
      }]
    })
      .then((interviews: Interview[]) => {
        _interviews = interviews;
        let interviewStudents = interviews.map((interview) =>
          interview.studentUser.$get('profile')
        );
        return Promise.all(interviewStudents);
      })
      .then(profiles => {
        return _interviews.map((interview, i) => {
          let newInt = Object.assign({}, interview);
          newInt.studentUser.profile = profiles[i];
          return newInt;
        });
      });
  }

  static getInterviewsByStudent(studentId: number): PromiseLike<Interview[]> {
    let _interviews;

    return Interview.findAll({
      where: {studentUserId: studentId},
      include: [{
        model: Fair,
        as: 'fair'
      }, {
        model: CompanyUser,
        as: 'companyUser'
      }]
    })
      .then((interviews: Interview[]) => {
        _interviews = interviews;
        let interviewCompanies = interviews.map((interview) =>
          interview.companyUser.$get('company')
        );
        return Promise.all(interviewCompanies);
      })
      .then((companies) => {
        return _interviews.map((interview, i) => {
          let newInt = Object.assign({}, interview);
          newInt.companyUser.company = companies[i];
          return newInt;
        });
      });
  }
}