// Requiring the modules
// Import external modules
import express from "express";
import cors from "cors";
import statusCodes from 'http-status-codes';


// Import internal modules
import whiskyRouter from "../src/routers/whisky-router.js";
import distilleryRouter from "../src/routers/distillery-router.js";
import reviewRouter from "../src/routers/review-router.js";

//initializing express
const app = express();

// Creating a port variable to listen on later
const port = 3000;

// Body can use json
app.use(cors());
app.use(express.json());

// Use routers
app.use("/whiskies", whiskyRouter);
app.use("/distilleries", distilleryRouter);
app.use("/reviews", reviewRouter);

// Server setup, listening on port 3000 (port variable)
app.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});










