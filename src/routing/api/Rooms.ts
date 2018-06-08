import {Router, Request, Response, NextFunction} from 'express';
import {JsonController, Body, Get, Req, Param} from 'routing-controllers';
import {jwt} from 'twilio';

@JsonController('/api/rooms')
export class ApiRoomsRouter {
  @Get('/joinRoom/:roomName')
  joinRoom(@Param('roomName') roomName: string): any {
    let twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    let twilioApiKey = process.env.TWILIO_API_KEY;
    let twilioApiSecret = process.env.TWILIO_API_SECRET;
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new jwt.AccessToken(twilioAccountSid, twilioApiKey,
      twilioApiSecret);
    token.identity = req.user.email;

    // Create a Video grant which enables a client to use Video
    // and limits access to the specified Room (DailyStandup)
    const videoGrant = new jwt.AccessToken.VideoGrant({
      room: roomName
    });

    // Add the grant to the token
    token.addGrant(videoGrant);
    return {token: token.toJwt()};
  }
}
