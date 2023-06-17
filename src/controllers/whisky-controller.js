
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";



/* HELPER FUNCTIONS */
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

// export function getWhiskyById(req, res){
//     const id = req.params.whiskyId;
//
//     if (returnWhiskyById(id) === undefined){
//         res.status(404).send("Whisky with id " + id + " does not exist!");
//     }
//     res.status(200).send(returnWhiskyById(id));
// }
export function getWhiskyById(req, res) {

    const id = req.params.whiskyId;
    console.log("Id = " + id);
    console.log("request body =" + req.body);

    const whisky = db.getWhiskyById(id);
    if (!whisky) {
        return res.status(404).send("Whisky with ID " + id + " does not exist!");
    }
    //res.status(statusCodes.OK).json(db.getWhiskyById(whisky));
    res.status(statusCodes.OK).send(whisky);
}

export function postWhisky(req, res) {
    const whisky = req.body;
    console.log(whisky);

    // Validate the required whisky data
    if (!whisky.age) {
        return res.status(400).json({ error: 'Missing required data for whisky' });
    }

    // Execute the insert query with the whisky data
    db.postWhisky(whisky, (error) => {
        if (error) {
            console.error('Error inserting whisky:', error);
            return res.status(500).json({ error: 'Failed to create whisky' });
        }

        // Return a success response with the new whisky object
        return res.status(201).json(whisky);
    });
}