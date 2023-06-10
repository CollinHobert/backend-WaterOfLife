import express from "express";
import * as reviewController from "../controllers/review-controller.js";

const router = express.Router();

// ALL CALLS HERE
// GET calls
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);

// POST calls
//router.post('/', reviewController.postReview);

// PUT calls
//router.put('/:id', reviewController.updateReviewById);

// DELETE calls
//router.delete('/:id', reviewController.deleteReviewById);

// Finally
export default router;

