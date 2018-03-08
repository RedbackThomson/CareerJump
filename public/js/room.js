function addParticipantTracks(participant) {
  participant.on('trackAdded', track => {
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

$('#room-name').text(`'${roomName}'`);

$.getJSON('/api/rooms/createRoom/' + roomName, function(data) {
  let token = data.token;

  Twilio.Video.connect(token, {
    audio: true,
    name: roomName,
    video: true
  }).then(setupRoom);
});

Twilio.Video.createLocalVideoTrack().then(track => {
  var localMediaContainer = document.getElementById('local-media-ctr');
  localMediaContainer.appendChild(track.attach());
});
