// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: express server providing a webhook for messaging
// author(s): Jake Allinson
//

// express server
import Express from 'express';
import checkSlots from "./helpers/slots.js";
import routes from "./helpers/routes.js";
import bodyParser from "body-parser";

const port = 3000;

const app = Express();

// use body parser for routes
app.use(bodyParser.json({extended: true}));

// Register the slot checker.
checkSlots();

// start the server
app.listen(port, function() {
  console.log('server listening on port ' + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// routes
app.use("/webhook", routes);