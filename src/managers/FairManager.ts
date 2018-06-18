import { Fair, FairAttendance, AttendingCompanyUser, Interview } from "../models";

export class FairManager {
  static getAttendance(fairId: number, companyId: number): PromiseLike<FairAttendance> {
    return FairAttendance.findOne({
      where: {
        fairId,
        companyId
      }
    });
  }
  
  static getFairByAlias(fairAlias: string): PromiseLike<Fair> {
    return Fair.findOne({
      where: {
        alias: fairAlias
      }
    });
  }

  static getFairsByStudent(studentUserId): PromiseLike<Fair[]> {
    return Interview.findAll({
      where: {
        studentUserId
      }
    })
      .then((interviews: Interview[]) => {
        if(interviews.length === 0) {
          return [];
        }

        var fairIds = [... new Set(interviews.map((interview: Interview) => interview.fairId))];
        return Fair.findAll({
          where: {
            id: {
              $or: fairIds
            }
          }
        });
      });
  }

  static getFairsByCompany(companyId): PromiseLike<Fair[]> {
    return FairAttendance.findAll({
      where: {
        companyId
      }
    })
      .then((fairAttendances: FairAttendance[]) => {
        if(fairAttendances.length === 0) {
          return [];
        }
        return FairManager.getFairsFromAttendance(fairAttendances);
      });
  }

  static getFairsByAttendingUser(companyUserId): PromiseLike<Fair[]> {
    return AttendingCompanyUser.findAll({
      where: {
        companyUserId
      }
    })
      .then((attendings: AttendingCompanyUser[]) => {
        if (attendings.length === 0) {
          return [];
        }

        var fairAttendanceIds = attendings.map((attending: AttendingCompanyUser) => attending.attendanceId);
        return FairAttendance.findAll({
          where: {
            id: {
              $or: fairAttendanceIds
            }
          }
        })
      })
      .then((fairAttendances: FairAttendance[]) => {
        if(fairAttendances.length === 0) {
          return [];
        }
        
        return FairManager.getFairsFromAttendance(fairAttendances);
      });
  }

  static getFairsFromAttendance(fairAttendances: FairAttendance[]): PromiseLike<Fair[]> {
    var fairIds = fairAttendances.map((fair: FairAttendance) => fair.fairId);
      return Fair.findAll({
        where: {
          id: {
            $or: fairIds
          }
        }
      });
  }
}