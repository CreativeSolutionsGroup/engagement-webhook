// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing automated mass text notifications
// author(s): Alec Mathisen
//
require('dotenv').config();
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const twilioNumber = "+12058830991";
const axios = require('axios');
const auth = require("../helpers/auth");
const service = client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

exports.sendAnnouncement = function (req, res) {
    let userAuthToken = auth.extractToken(req);
    if (userAuthToken === null) {
        res.json({
            status: "error",
            message: "No authToken provided"
        });
        return;
    }
    const numbers = req.body.numbers;
    auth.authUser(userAuthToken)
    .then(response => {
        if (response) {
            const body = req.body.message;

            if (numbers === undefined) {
                res.json({
                    status: "error",
                    message: "No Numbers Provided"
                });
                return;
            }

            const bindings = numbers.map(number => {
                return JSON.stringify({ binding_type: 'sms', address: number });
            });
            console.log("Creating an Announcement")
            console.log("Number Count: " + numbers.length);
            console.log("Message: " + body);

            if(service === undefined){
                console.error("Null Twilio Notification Service");
                res.json({ status: "error", message: "Error with Twilio Service" });
                return;
            }

            service.notifications
            .create({
                toBinding: bindings,
                body: body
            })
            .then(notification => {
                console.log(notification);
                res.json({ status: "success" });
            })
            .catch(err => {
                console.error(err);
                res.json({ status: "error", message: "Error with Twilio Service" });
            });
        }
        else {
            res.json({
                status: "error",
                message: "Announcement permission denied"
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.json({
            status: "error",
            message: error
        });
    });
};



