import { Fair, FairAttendance, AttendingCompanyUser, Interview } from "../models";
import { OperatorsAliases } from "sequelize";

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
      .then(FairManager.getFairsFromAttendance);
  }

  static getFairsByAttendingUser(companyUserId): PromiseLike<Fair[]> {
    return AttendingCompanyUser.findAll({
      where: {
        companyUserId
      }
    })
      .then((attendings: AttendingCompanyUser[]) => {
        var fairAttendanceIds = attendings.map((attending: AttendingCompanyUser) => attending.attendanceId);
        return FairAttendance.findAll({
          where: {
            id: {
              $or: fairAttendanceIds
            }
          }
        })
      })
      .then(FairManager.getFairsFromAttendance);
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