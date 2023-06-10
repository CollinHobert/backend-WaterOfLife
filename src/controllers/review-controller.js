import statusCodes from 'http-status-codes';
import * as db from "../database/database-helper.js";

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


