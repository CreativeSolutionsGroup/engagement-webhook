// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: API routing for all controllers
// author(s): Jake Allinson
//

// initialize the express router
let router = require('express').Router();

// controllers
const messagingController = require('../controllers/messagingController');
const giveawayController = require('../controllers/giveawayController');
const notificationTokenController = require('../controllers/notificationTokenController');

// EVENTS
router.route('/messaging')
  .post(messagingController.handleRequest);
router.route('/giveaway')
  .post(giveawayController.sendMessage);
router.route('/notification_tokens')
.post(notificationTokenController.saveToken);

module.exports = router;