// Import modules
import express from 'express';
import statusCodes from "http-status-codes";

const router = express.Router();

//import internal
import * as whiskyController from "../controllers/whisky-controller.js";

//calls
// Handling of the GET request /whisky
router.get('/', whiskyController.getAllWhiskies);
router.get('/:whiskyId', whiskyController.getWhiskyById);

// POST calls
router.post('/', whiskyController.postWhisky);

// PUT calls
router.put('/:whiskyId', whiskyController.updateWhiskyById);

// DELETE calls
router.delete('/:whiskyId', whiskyController.deleteWhiskyById);

//finally
export default router;