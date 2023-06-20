// Imports
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";

/* EXPORT FUNCTIONS */
export function getAllDistilleries(req,res) {
    // let name = req.query.name;
    // if (name == undefined) { name = '' };
    // const distilleries = db.getDistilleryByName(name);
    // for (let whisky of whiskies) {
    //     whisky.distilleryId = db.getWhiskiesForDistillery(whisky.id);
    // }
    res.status(statusCodes.OK).json(db.getAllDistilleries());
}

export function getDistilleryById(req,res) {
    const id = req.params.distilleryId;
    const distillery = findDistilleryById(id);
    return res.status(statusCodes.OK).json(distillery);
}

export function deleteDistilleryById(req,res) {
    const distillery = findDistilleryById(req.params.id);
    db.deleteDistilleryById(distillery.id);
    return res.status(statusCodes.NO_CONTENT).json();
}

// add new distillery to database, checks if the given data is valid
export async function postDistillery(req, res) {
    try {
        console.log("POST DISTILLERY");
        // Get the distillery data from the request body
        const newDistillery = req.body;

        // Validate the required distillery data
        if (!newDistillery.name || !newDistillery.country || !newDistillery.region || !newDistillery.description) {
            return res.status(400).json({ error: 'Missing required data for distillery' });
        }

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
        const distillery = req.body; // Assuming the updated distillery data is sent in the request body
        console.log("PUT DISTILLERY");

        // Validate the required distillery data
        if (isNaN(id) || !distillery.name || !distillery.country || !distillery.region || !distillery.description) {
            return res.status(400).json({ error: 'Missing required data for distillery' });
        }

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



