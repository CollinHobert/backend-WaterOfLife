import express from "express";
import * as distilleryController from "../controllers/distillery-controller.js";

const router = express.Router();

// ALL CALLS HERE
// GET calls
router.get('/', distilleryController.getAllDistilleries);
router.get('/:distilleryId', distilleryController.getDistilleryById);

// POST calls
router.post('/', distilleryController.postDistillery);

// PUT calls
router.put('/:distilleryId', distilleryController.updateDistilleryById);

// DELETE calls
router.delete('/:distilleryId', distilleryController.deleteDistilleryById);

// Finally
export default router;
