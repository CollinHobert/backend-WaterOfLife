import statusCodes from 'http-status-codes';

// Internal import
import * as db from "../database/database-helper.js";

/* EXPORT FUNCTIONS */
// Get review by id, uses findReviewById helper function
export function getReviewById(req,res) {
    const id = req.params.reviewId;
    const review = findReviewById(id);
    return res.status(statusCodes.OK).json(review);
}

// add new review to database, checks if the given data is valid
export async function postReview(req, res) {
    try {
        const newReview = req.body;

        // Validate the required review data
        // if (isNaN(newReview.rating) || !newReview.rating || !newReview.comment) {
        //     return res.status(400).json({error: 'Missing required data for review'});
        // }

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
        const review = req.body; // the updated review data is sent in the request body

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

// Deletes review by id. Checks if the review exists, if not an error will be thrown.
export function deleteReviewById(req,res) {
    try {
        const id = req.params.reviewId;
        db.deleteReviewById(id);
        return res.status(statusCodes.NO_CONTENT).json();
    } catch (error) {
        // Error handling
        console.error('Error deleting review: ', error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete review.' });
    }
}

//HELPER METHODS
//Searches for review by id, throws error when id is not a number or not found
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


