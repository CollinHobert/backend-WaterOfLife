// Imports
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";

/* EXPORT FUNCTIONS */

// Get all distilleries or when country is defined, filter by country
export async function getAllDistilleries(req,res) {
    try {
        let distilleries;
        let country = req.query.country;

        if (country === undefined || country === 'Show All') {
            distilleries = await db.getAllDistilleries();
            res.status(statusCodes.OK).json(distilleries);
        } else {
            distilleries = await db.getDistilleriesByType(country);
            res.status(statusCodes.OK).json(distilleries);
        }
    } catch (error) {
        console.error("Error fetching distilleries:", error);
        res.status(500).send("Error fetching distilleries");
    }
}

// Gets distillery by id. Checks if the distillery exists, if not an error will be thrown.
export function getDistilleryById(req,res) {
    const id = req.params.distilleryId;
    const distillery = findDistilleryById(id);
    if (!distillery) {
        return res.status(statusCodes.NOT_FOUND).json({ error: 'Distillery not found' });
    }
    return res.status(statusCodes.OK).json(distillery);
}

// Deletes distillery by id. Checks if the distillery exists, if not an error will be thrown.
export function deleteDistilleryById(req,res) {
    try {
        const id = req.params.distilleryId;
        db.deleteDistilleryById(id);
        return res.status(statusCodes.NO_CONTENT).json();
    } catch (error) {
        // Error handling
        console.error('Error deleting distillery:', error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete distillery.' });
    }
}

// add new distillery to database, checks if the given data is valid
export async function postDistillery(req, res) {
    try {
        // Get the distillery data from the request body
        const newDistillery = req.body;

        // Execute the insert query with the distillery data
        await db.postDistillery(newDistillery);

        // Return a success response with the new distillery object
        return res.status(201).json(newDistillery);
    } catch (error) {
        console.error('Error inserting distillery:', error);
        return res.status(500).json({ error: 'Failed to create distillery' });
    }
}

export async function updateDistilleryById(req, res) {
    try {
        const id = req.params.distilleryId;
        const distillery = req.body; // the updated distillery data is sent in the request body

        // Execute the update query with the distillery data
        await db.putDistilleryById(id, distillery);

        // Return a success response
        res.status(200).json({ message: 'Distillery updated successfully' });
    } catch (error) {
        console.error('Error updating distillery:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

//HELPER FUNCTIONS
// Searches for distillery by id, throws error when id is not a number or not found
function findDistilleryById(distilleryId) {
    const id = Number(distilleryId);
    if (isNaN(id)) {
        throw { status: statusCodes.BAD_REQUEST, message: 'Please provide a proper id!' };
    }

    const distillery = db.getDistilleryById(id);
    if (!distillery) {
        throw { status: statusCodes.NOT_FOUND, message: `Distillery with ID ${id} not found!` };
    }

    return distillery;
}



