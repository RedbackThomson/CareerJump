require('dotenv').config();

const path = require('path');

const express = require('express');
const app = express();

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.engine('pug', require('pug').__express);
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));

app.get('/api/createRoom/:roomName', (req, res) => {
  let twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  let twilioApiKey = process.env.TWILIO_API_KEY;
  let twilioApiSecret = process.env.TWILIO_API_SECRET;
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
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

app.get('/room/:roomName', (req, res) => {
  return res.render('room.pug', {
    title: req.params.roomName,
    roomName: req.params.roomName
  });
});

app.get('/', (req, res) => res.render('index.pug'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));