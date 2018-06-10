import {Controller, Param, Body, Get, Authorized, CurrentUser, Res} from "routing-controllers";
import { StudentUser, CompanyUser, Interview } from '../../models';
import { InterviewManager } from '../../managers/InterviewManager';

@Controller('/rooms')
export class RoomsController {
  @Get('/:roomName')
  @Authorized()
  get(@Param('roomName') room: string, @CurrentUser() user, @Res() res) {
    return InterviewManager.getInterviewByRoom(room)
      .then((interview: Interview) => {
        // Conditionally render the company version
        if(user instanceof CompanyUser) {
          return res.render("pages/room/company", {
            interview
          });
        }
        return res.render("pages/room/student", {
          interview
        });
      });
  }
}