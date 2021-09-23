// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing automated giveaway messages
// author(s): Alec Mathisen
//
import client from 'twilio'
import dotenv from "dotenv";
import { extractToken, authUser } from "../helpers/auth.js";

dotenv.config();

client(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const twilioNumber = process.env.TWILIO_NUMBER;


const sendMessage = (req, res) => {
  let userAuthToken = extractToken(req);
  if (userAuthToken === null) {
    res.json({
      status: "error",
      message: "No authToken provided"
    });
    return;
  }
  authUser(userAuthToken)
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
}

export default sendMessage;