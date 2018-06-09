import {Router, Request, Response, NextFunction} from 'express';
import {JsonController, Body, Get, Req, Param, CurrentUser, Authorized} from 'routing-controllers';
import {jwt} from 'twilio';

@JsonController('/api/rooms')
export class ApiRoomsRouter {
  @Get('/joinRoom/:roomName')
  @Authorized()
  joinRoom(@Param('roomName') roomName: string, @CurrentUser() user): any {
    let twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    let twilioApiKey = process.env.TWILIO_API_KEY;
    let twilioApiSecret = process.env.TWILIO_API_SECRET;

    const token = new jwt.AccessToken(twilioAccountSid, twilioApiKey,
      twilioApiSecret);
    token.identity = user.email;

    const videoGrant = new jwt.AccessToken.VideoGrant({
      room: roomName
    });

    token.addGrant(videoGrant);
    return {token: token.toJwt()};
  }
}
