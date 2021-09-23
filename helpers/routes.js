// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: API routing for all controllers
// author(s): Jake Allinson
//

// initialize the express router
import Router from "express";

const router = Router.Router();

// controllers
import messagingController from '../controllers/messagingController.js';
import giveawayController from '../controllers/giveawayController.js';

// EVENTS
router.route('/messaging')
  .post(messagingController);
router.route('/giveaway')
  .post(giveawayController);

export default router;