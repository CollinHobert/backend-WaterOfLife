import statusCodes from 'http-status-codes';

// Internal import
import * as db from "../database/database-helper.js";
import { insertReviewQuery } from '../database/queries.js'; // Import the insertReviewQuery


export function getAllReviews(req,res) {
    let name = req.query.name;
    if (name == undefined) { name = '' };
    const reviews = db.getReviewsByName(name);

    res.status(statusCodes.OK).json(reviews);
}

export function getReviewById(req,res) {
    const review = findReviewById(req.params.id);
    //review.toys = db.getToysForReview(review.id);
    return res.status(statusCodes.OK).json(review);
}

export function deleteReviewById(req,res) {
    const review = findReviewById(req.params.id);
    db.deleteReviewById(review.id);
    return res.status(statusCodes.NO_CONTENT).json();
}

//TODO: POST AND PUT Reviews
export function postReview(req, res) {
    // Assuming the review data is passed in the request body
    const newReview = req.body;
    console.log(newReview);

    // Validate the required review data
    // if (!rating || !comment) {
    //     return res.status(400).json({ error: 'Missing required data for review' });
    // }

    // Execute the insert query with the review data
    db.postReview(newReview, (error) => {
        if (error) {
            console.error('Error inserting review:', error);
            return res.status(500).json({ error: 'Failed to create review' });
        }
        // Return a success response with the new review object
        return res.status(201).json(newReview);
    });
}


//HELPER METHODS
function findReviewById(reviewId) {
    const id = Number(reviewId);
    if (isNaN(id)) {
        throw { status: statusCodes.BAD_REQUEST, message: 'Please provide a proper id!' };
    }

    const review = db.getReviewById(id);
    if (!review) {
        throw { status: statusCodes.NOT_FOUND, message: `Review with ID ${id} not found!` };
    }

    return review;
}


