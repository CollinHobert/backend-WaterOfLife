import express from "express";

// Internal import
import * as reviewController from "../controllers/review-controller.js";


const router = express.Router();

// ALL CALLS HERE
// GET calls
router.get('/', reviewController.getAllReviews);
router.get('/:reviewId', reviewController.getReviewById);

// POST calls
router.post('/', reviewController.postReview);

// PUT calls
router.put('/:id', reviewController.updateReviewById);

// DELETE calls
//router.delete('/:id', reviewController.deleteReviewById);

// Finally
export default router;

