
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";

/* EXPORT FUNCTIONS */

// Get all whiskies or if there is a type defined (Single Malt, Blended or Bourbon), get whiskies by type.
export async function getAllWhiskies(req, res) {
    try {
        let whiskies;
        let type = req.query.type;

        if (type === undefined || type === 'Show All') {
            console.log("ALL WHISKIES");
            whiskies = await db.getAllWhiskies();
            res.status(statusCodes.OK).json(whiskies);
        } else {
            console.log("WHISKIES BY TYPE");
            whiskies = await db.getWhiskiesByType(type);
            res.status(statusCodes.OK).json(whiskies);
        }
    } catch (error) {
        console.error("Error fetching whiskies:", error);
        res.status(500).send("Error fetching whiskies");
    }
}

export function getWhiskyById(req, res) {
    const id = req.params.whiskyId;
    const whisky = findWhiskyById(id);
    res.status(statusCodes.OK).send(whisky);
}

// add new whisky to database, checks if the given data is valid
export async function postWhisky(req, res) {
    try {
        console.log("POST WHISKY");
        const whisky = req.body;

        // Validate the required whisky data
        if (isNaN(whisky.age) || !whisky.age || !whisky.name || !whisky.type || !whisky.image || !whisky.description) {
            return res.status(400).json({ error: 'Missing required data for whisky' });
        }

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
        const whisky = req.body; // Assuming the updated whisky data is sent in the request body
        console.log("PUT WHISKY");
        console.log("id: " + id);

        // Validate the required whisky data
        if (isNaN(id) || !whisky.age || !whisky.name || !whisky.type || !whisky.image || !whisky.description) {
            return res.status(400).json({ error: 'Missing required data for whisky' });
        }

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
        console.log("DELETE WHISKY");
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
function returnWhiskyById(id){
    for (const whisky of whiskies){
        if (whisky.whiskyId == id){
            return whisky;
        }
    }
}
function returnWhiskiesByType(type) {
    let whiskiesReturnByType = [];
    for (const whisky of whiskies) {
        if (whisky.type === type) {
            whiskiesReturnByType.push(whisky);
        }
    }
    return whiskiesReturnByType;
}
function returnWhiskiesByKeyword(keyword) {
    let whiskiesByKeyword = [];
    for (const whisky of whiskies) {
        if (whisky.description.toLowerCase().includes(keyword)) {
            whiskiesByKeyword.push(whisky);
        }
    }
    return whiskiesByKeyword;
}
function filterWhiskyByDistilleryName(distilleryName){
    let whiskiesReturn = [];
    for (const whisky of whiskies){
        if (whisky.distillery.includes(distilleryName)){
            whiskiesReturn.push(whisky);
        }
    }
    return whiskiesReturn;
}
