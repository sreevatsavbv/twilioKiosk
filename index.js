// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC7ee6e814b006741f63d925c7ec4cfd97';
const authToken = 'eede3e3706f75192e9c4cc57b6bf3fda';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
        body: 'Hello there!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+918682959899'
      })
      .then(message => console.log(message.sid))
      .done();
