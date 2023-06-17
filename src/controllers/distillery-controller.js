// Imports
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";
import { insertDistilleryQuery } from '../database/queries.js'; // Import the insertDistilleryQuery


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
    const distillery = findDistilleryById(req.params.id);
    distillery.whiskies = db.getWhiskiesForDistillery(whisky.id);
    return res.status(statusCodes.OK).json(distillery);
}

export function deleteDistilleryById(req,res) {
    const distillery = findDistilleryById(req.params.id);
    db.deleteDistilleryById(distillery.id);
    return res.status(statusCodes.NO_CONTENT).json();
}

//TODO: POST AND PUT cats
export function postDistillery(req, res) {
    // Get the distillery data from the request body
    const newDistillery = req.body;
    console.log(req.body);

    // Validate the required distillery data
    // if (!name || !country || !region || !description) {
    //     return res.status(400).json({ error: 'Missing required data for distillery' });
    // }

    // Execute the insert query with the distillery data
    db.postDistillery(newDistillery, (error) => {
        if (error) {
            console.error('Error inserting distillery:', error);
            return res.status(500).json({ error: 'Failed to create distillery' });
        }

        // Return a success response with the new distillery object
        return res.status(201).json(newDistillery);
    });
}

//HELPER METHODS
function findDistilleryById(distilleryId) {
    const id = Number(distilleryId);
    if (isNaN(id)) {
        throw { status: statusCodes.BAD_REQUEST, message: 'Please provide a proper id!' };
    }

    const distillery = db.getDistilleryById(id);
    if (!distillery) {
        throw { status: statusCodes.NOT_FOUND, message: `Cat with ID ${id} not found!` };
    }

    return distillery;
}



