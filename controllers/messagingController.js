// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing responses for messages from Twilio
// author(s): Jake Allinson
//

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const axios = require('axios');

exports.handleRequest = function (req, res) {
  // new messaging object
  const twiml = new MessagingResponse();
  const message = twiml.message();
  getEngagements()
    .then((engagements) => {
      if (engagements && engagements.length) {
        // check if incoming message matches (using regex) any engagement keyword
        const matches = engagements.filter(eng => RegExp(eng.keyword).test(req.body.Body));
        if (matches && matches.length) {
          message.body(matches[0].message);
          // check for valid image url
          if (matches[0].image_url && matches[0].image_url != "") {
            message.media(matches[0].image_url);
          }
          // send engagee to smart events
          createNewEngagee(req.body.From, req.body.Body, matches[0]);
        } else {
          message.body("Hmm. I don't recognize that. Try a different message!");
        }
      } else {
        message.body("Bummer. No events seem to be happening at the moment. Check back later!");
      }
      // send the response
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
    .catch(() => {
      // send error response
      message.body("Oops. There has been an error, try again later!");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
};

const apiRoute = "http://18.222.7.110"

function getEngagements()
{
  return new Promise((resolve, reject) => {
    axios.get(`${apiRoute}/api/engagements`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        reject();
      })
 });
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