$('.js-show-volume').click(function() {

});

function addParticipantTracks(participant) {
  participant.on('trackAdded', track => {
    $('.video-feeds__connecting').hide();
    document.getElementById('remote-media-div').appendChild(track.attach());
  });
}

function setupRoom(room) {
  const localParticipant = room.localParticipant;
  console.log('Connected to the Room as LocalParticipant "%s"',
    localParticipant.identity);

  // Log any Participants already connected to the Room
  room.participants.forEach(addParticipantTracks);

  room.on('participantConnected', function(participant) {
    console.log('Participant "%s" has connected to the room',
      participant.identity);
    addParticipantTracks(participant);
  });

  room.once('participantDisconnected', participant => {
    console.log('Participant "%s" has disconnected from the room',
      participant.identity);
    $('.video-feeds__connecting').show();
    participant.tracks.forEach(track => {
      track.detach().forEach(element => element.remove());
    });
  });

  room.on('disconnected', room => {
    // Detach the local media elements
    room.localParticipant.tracks.forEach(track => {
      var attachedElements = track.detach();
      attachedElements.forEach(element => element.remove());
    });
  });
}

$.getJSON('/api/rooms/joinRoom/' + roomName, function(data) {
  let token = data.token;

  Twilio.Video.connect(token, {
    audio: true,
    name: roomName,
    video: true
  }).then(setupRoom);
});

Twilio.Video.createLocalVideoTrack().then(track => {
  var localMediaContainer = document.getElementById('local-media-ctr');
  $('.video-feeds__camera').hide();
  localMediaContainer.appendChild(track.attach());
});
