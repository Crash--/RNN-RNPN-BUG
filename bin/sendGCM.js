var gcm = require('android-gcm');
 
// initialize new androidGcm object 
var gcmObject = new gcm.AndroidGcm('YOUR_API_KEY');
 
// create new message 
var message = new gcm.Message({
    registration_ids: ['YOUR_TOKEN'],
    data: {
        key1: 'key 1',
        key2: 'key 2'
    }
});
 
// send the message 
gcmObject.send(message, function(err, response) {
  console.log('error', err)
  console.log('response', response)
});
/*
//Add your mobile device registration tokens here
var regTokens = [''];
//Replace your developer API key with GCM enabled here
var sender = new gcm.Sender('788595811872');

sender.send(message, regTokens, function (err, response) {
    if(err) {
      console.error(err);
    } else {
      console.log(response);
    }
});*/