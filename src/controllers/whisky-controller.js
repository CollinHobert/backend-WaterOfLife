
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";

/* EXPORT FUNCTIONS */
// Get all whiskies or if there is a type defined (Single Malt, Blended or Bourbon), get whiskies by type.
export async function getAllWhiskies(req, res) {
    try {
        let whiskies;
        let type = req.query.type;
        let rating = req.query.rating;
        console.log(type);
        console.log(rating);

        // Check if there is a type or rating selected or not.
        // When there is no type án no rating selected or 'Show All' is selected, show all whiskies
        if ((type === undefined || type === 'undefined' || type === 'Show All') && (rating === undefined || rating === 'undefined' || rating === 'Show All')) {
            whiskies = await db.getAllWhiskies();
            res.status(statusCodes.OK).json(whiskies);

        // When there is a rating selected and type is 'Show All' or type is undefined, show whiskies only by rating.
        }else if ((rating !== undefined || rating !== 'undefined') && (type === undefined || type === "undefined" || type === 'Show All')) {
            whiskies = await db.getWhiskiesByRating(rating);
            res.status(statusCodes.OK).json(whiskies);

        // When there is a type selected and rating is 'Show All' or rating is undefined, show whiskies only by type.
        } else if ((type !== undefined || type !== 'undefined') && (rating === undefined || rating === 'undefined' || rating === 'Show All')) {
            whiskies = await db.getWhiskiesByType(type);
            res.status(statusCodes.OK).json(whiskies);

        // When there is a type and rating selected, show whiskies by rating and by type.
        } else if ((rating !== undefined || rating !== 'undefined') && (type !== undefined || type !== 'undefined')) {
            whiskies = await db.getWhiskiesByRatingAndType(rating, type);
            res.status(statusCodes.OK).json(whiskies);
        }

    } catch (error) {
        console.error("Error fetching whiskies:", error);
        res.status(500).send("Error fetching whiskies");
    }
}

// Get whisky by id, uses findWhiskyById helper function
export function getWhiskyById(req, res) {
    const id = req.params.whiskyId;
    const whisky = findWhiskyById(id);
    res.status(statusCodes.OK).send(whisky);
}

// Add new whisky to database, checks if the given data is valid
export async function postWhisky(req, res) {
    try {
        const whisky = req.body;

        await db.postWhisky(whisky);

        // Return a success response with the new whisky object
        return res.status(201).json(whisky);
    } catch (error) {
        console.error('Error inserting whisky:', error);
        return res.status(500).json({ error: 'Failed to create whisky' });
    }
}

// Update whisky with new data, checks if the given data is valid
export async function updateWhiskyById(req, res) {
    try {
        const id = req.params.whiskyId;
        const whisky = req.body; // the updated whisky data is sent in the request body

        // Execute the update query with the whisky data
        await db.putWhiskyById(id, whisky);

        // Return a success response
        return res.status(200).json({ message: 'Whisky updated successfully' });
    } catch (error) {
        console.error('Error updating whisky:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Deletes whisky by id. Checks if the whisky exists, if not an error will be thrown.
export function deleteWhiskyById(req,res) {
    try {
        const id = req.params.whiskyId;
        db.deleteWhiskyById(id);
        return res.status(statusCodes.NO_CONTENT).json();
    } catch (error) {
        // Error handling
        console.error('Error deleting whisky:', error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete whisky.' });
    }
}

//HELPER FUNCTIONS

// Searches for whisky by id, throws error when id is not a number or not found
function findWhiskyById(whiskyId) {
    const id = Number(whiskyId);
    if (isNaN(id)) {
        throw { status: statusCodes.BAD_REQUEST, message: 'Please provide a proper id!' };
    }
    const whisky = db.getWhiskyById(id);
    if (!whisky) {
        throw { status: statusCodes.NOT_FOUND, message: `Distillery with ID ${id} not found!` };
    }
    return whisky;
}

