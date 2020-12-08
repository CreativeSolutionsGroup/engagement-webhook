
// connect to twilio
// const twilio = require('../helpers/twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const axios = require('axios');

exports.handleRequest = function (req, res) {
  // new messaging object
  const twiml = new MessagingResponse();
  const message = twiml.message();
  getEngagements(function(engagements) {
    if (engagements && engagements.length) {
      // check if incoming message matches (with regex) any engagement keyword
      const matches = engagements.filter(eng => RegExp(eng.keyword).test(req.body.Body));
      if (matches && matches.length) {
        message.body(matches[0].message);
        // if (engagements[eng].image_url) {
        //   message.media(engagements[eng].image_url);
        // }
        // send engagee to smart events
        createNewEngagee(req.body.From, req.body.Body, matches[0]);
      } else {
        message.body("Hmm. I don't recognize that.");
      }
    } else {
      message.body("Bummer. No events seem to be happening at the moment. Check back later!");
    }
    // send the response
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });
};

const apiRoute = "http://localhost:3000"

function getEngagements(callback) {
  axios.get(`${apiRoute}/api/engagements`)
    .then((response) => {
      callback(response.data.data);
    })
    .catch((error) => { console.log(error) });
}

function createNewEngagee(phone, message, engagement) {
  axios.post(`${apiRoute}/api/engagees`, {
    engagement_id: engagement._id,
    phone: phone,
    message_received: message
  })
    .then((response) => {})
    .catch((error) => { console.log(error) });
}