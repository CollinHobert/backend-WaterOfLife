// Some created data of cat-objects stored in an array cats to have some dummy data to start with
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";




/* SOME helper FUNCTIONS */
function returnWhiskyById(id){
    for (const whisky of whiskies){
        if (whisky.whiskyId == id){
            return whisky;
        }
    }
}


//export functions
export function getAllWhiskies(req, res){
    let name = req.query.name;
    if (name === undefined){name = ''}
    //res.status(statusCodes.OK).json(db.getWhiskiesByName(name));

    // if (returnWhiskiesByType(type) === undefined) {
    //     res.status(404).send("There are no whiskies with type: " + type);
    // }else if (type === null || type === undefined){
    //     res.status(404).send("Type: " + type + " does not exist!");
    // }

    //console.log(returnWhiskiesByType(type))
    res.status(200).send(whiskies);
    //res.status(200).send(whiskies);
}

export function getWhiskiesByType(req, res){
    let type = req.query.name;
    if (type === undefined){type = ''}
    res.status(statusCodes.OK).json(db.getWhiskiesByType(type));

}

export function getWhiskyById(res, req){
    const id = req.params.whiskyId;

    if (returnWhiskyById(id) === undefined){
        res.status(404).send("Whisky with id " + id + " does not exist!");
    }
    res.status(200).send(returnWhiskyById(id));
}