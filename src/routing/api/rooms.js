const express = require('express');
const AccessToken = require('twilio').jwt.AccessToken;

const router = express.Router();

const VideoGrant = AccessToken.VideoGrant;

module.exports = (models) => {
  router.get('/createRoom/:roomName', (req, res) => {
    let twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    let twilioApiKey = process.env.TWILIO_API_KEY;
    let twilioApiSecret = process.env.TWILIO_API_SECRET;
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(twilioAccountSid, twilioApiKey,
      twilioApiSecret);
    token.identity = 'careerjump' + new Date().getTime();

    // Create a Video grant which enables a client to use Video
    // and limits access to the specified Room (DailyStandup)
    const videoGrant = new VideoGrant({
      room: req.params.roomName
    });

    // Add the grant to the token
    token.addGrant(videoGrant);
    return res.json({token: token.toJwt()});
  });

  return router;
};
