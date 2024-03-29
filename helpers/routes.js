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
const announcementController = require('../controllers/announcementController');

// EVENTS
router.route('/messaging')
  .post(messagingController.handleRequest);
router.route('/giveaway')
  .post(giveawayController.sendMessage);
router.route('/announcement')
  .post(announcementController.sendAnnouncement);

module.exports = router;