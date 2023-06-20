
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";

/* EXPORT FUNCTIONS */
export function getAllWhiskies(req, res){
    // console.log(res.query.name);
    // console.log(req.name);
    // let name = req.query.name;
    // if (name === undefined){name = ''}
    // res.status(statusCodes.OK).json(db.getWhiskiesByName(name));

    // if (returnWhiskiesByType(type) === undefined) {
    //     res.status(404).send("There are no whiskies with type: " + type);
    // }else if (type === null || type === undefined){
    //     res.status(404).send("Type: " + type + " does not exist!");
    // }

    //console.log(returnWhiskiesByType(type))
    res.status(statusCodes.OK).json(db.getAllWhiskies());
    //res.status(200).send(whiskies);
}

export function getWhiskiesByType(req, res){
    let type = req.query.name;
    if (type === undefined){type = ''}
    res.status(statusCodes.OK).json(db.getWhiskiesByType(type));
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
