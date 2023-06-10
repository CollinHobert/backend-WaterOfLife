// Import modules
import express from 'express';
import statusCodes from "http-status-codes";

const router = express.Router();

//import internal
import * as whiskyController from "../controllers/whisky-controller.js";

//calls
// Handling of the GET request /cats
router.get('', whiskyController.getAllWhiskies);
router.get('/:whiskyId', whiskyController.getWhiskyById);

//finally
export default router;