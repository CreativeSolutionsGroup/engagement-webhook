// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing automated giveaway messages
// author(s): Alec Mathisen
//
require('dotenv').config();
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const twilioNumber = process.env.TWILIO_NUMBER;
const auth = require("../helpers/auth");

exports.sendMessage = function (req, res) {
  let userAuthToken = auth.extractToken(req);
  if (userAuthToken === null) {
    res.json({
      status: "error",
      message: "No authToken provided"
    });
    return;
  }
  auth.authUser(userAuthToken)
  .then(response => {
    if (response) {
        client.messages
        .create({
          from: twilioNumber,
          to: req.body.to,
          body: req.body.body
        })
        .then(() => {
          res.json({ status: "success" });
        })
        .catch(err => {
          console.log(err);
          res.json({ status: "error", message: err });
        });
    }
    else {
      res.json({
        status: "error",
        message: "Text permission denied"
      });
    }
  })
  .catch(error => {
    res.json({
      status: "error",
      message: error
    });
  });
};



