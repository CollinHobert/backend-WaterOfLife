import statusCodes from 'http-status-codes';

// Internal import
import * as db from "../database/database-helper.js";


export function getAllReviews(req,res) {
    let name = req.query.name;
    if (name == undefined) { name = '' };
    const reviews = db.getReviewsByName(name);

    res.status(statusCodes.OK).json(reviews);
}

export function getReviewById(req,res) {
    const id = req.params.reviewId;
    console.log("req: " + req.params.reviewId);
    console.log("whisky id for review: " + id);
    const review = findReviewById(id);
    return res.status(statusCodes.OK).json(review);
}

export function deleteReviewById(req,res) {
    const review = findReviewById(req.params.id);
    db.deleteReviewById(review.id);
    return res.status(statusCodes.NO_CONTENT).json();
}

// add new review to database, checks if the given data is valid
export async function postReview(req, res) {
    try {
        const newReview = req.body;
        const whisky = req.body;
        console.log("POST REVIEW");

        // Validate the required review data
        if (isNaN(newReview.rating) || !newReview.rating || !newReview.comment) {
            return res.status(400).json({error: 'Missing required data for review'});
        }

        // Validate the required whisky data
        if (isNaN(whisky.age) || !whisky.age || !whisky.name || !whisky.type || !whisky.image || !whisky.description) {
            return res.status(400).json({error: 'Missing required data for whisky'});
        }

        // Execute the insert query with the review data
        await db.postReview(newReview);

        res.status(201).json(newReview); // Return a success response with the new review object
    } catch (error) {
        console.error('Error inserting review:', error);
        res.status(500).json({error: 'Failed to create review'});
    }
}


// Update review with new data, checks if the given data is valid
export async function updateReviewById(req, res) {
    try {
        const id = req.params.id;
        const review = req.body; // Assuming the updated review data is sent in the request body
        console.log("PUT REVIEW");
        console.log("id: " + id);

        // Validate the required review data
        if (isNaN(review.rating) || !review.rating || !review.comment) {
            return res.status(400).json({ error: 'Missing required data for review' });
        }

        // Update the review in the database
        await db.putReviewById(id, review);

        // Return a success response
        res.status(200).json({ message: 'Review updated successfully test' });
    } catch (error) {
        console.error('Error updating review:', error);
        console.log("debug error");
        res.status(500).json({ error: 'Internal server error' });
    }
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


