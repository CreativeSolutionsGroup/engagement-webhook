// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing responses for messages from Twilio
// author(s): Jake Allinson
//

import twil from 'twilio';
import axios from "axios";

const MessagingResponse = twil.twiml.MessagingResponse;

export default function (req, res) {
  // new messaging object
  const twiml = new MessagingResponse();
  const message = twiml.message();
  getEngagements()
    .then(engagements => {
      if (engagements && engagements.length) {
        // check if incoming message matches engagement keyword (using regex) and is live
        const matches = engagements.filter(eng => 
          RegExp(eng.keyword, "i").test(req.body.Body) && isLiveEngagement(eng)
        );
        if (matches && matches.length) {
          // use the first found match
          let engagement = matches[0];
          let messageContent = engagement.message.replace(/\|/g, "\n");
          message.body(messageContent);
          // check for valid image url
          // TODO: check that image url doesn't return a 404
          if (engagement.image_url && engagement.image_url != "") {
            let images = engagement.image_url.split('|');
            images.forEach((image) => message.media(image));
          }
          // send engagee to smart events API
          createNewEngagee(req.body.From, req.body.Body, engagement);
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
    .catch((error) => {
      // send error response
      console.log("error: " + error)
      message.body("Oops. There has been an error, try again later!");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
};

const apiRoute = process.env.API_URL;

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

function isLiveEngagement(engagement)
{
  let time = new Date();
  return new Date(engagement.start_time) <= time && time <= new Date(engagement.end_time)
}