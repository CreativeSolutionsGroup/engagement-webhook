// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller saving tokens for push notifications
// author(s): Alec Mathisen
//

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });
const axios = require('axios');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.saveToken = function (req, res) {
    documentClient.put({
        TableName: "vq_firebase_keys",
        Item: req.body
    }).promise()
    .then(() => {
      res.json({ status: "success" });
    })
    .catch(err => {
      console.log(err);
      res.json({ status: "error", message: err });
    });
};