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

// EVENTS
router.route('/messaging')
  .post(messagingController.handleRequest);
router.route('/giveaway')
  .post(giveawayController.sendMessage);

module.exports = router;