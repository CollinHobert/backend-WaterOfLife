// Imports
import statusCodes from "http-status-codes";
import * as db from "../database/database-helper.js";


export function getAllDistilleries(req,res) {
    let name = req.query.name;
    if (name == undefined) { name = '' };
    const distillery = db.getDistilleryByName(name);
    for (let whisky of whiskies) {
        whisky.distilleryId = db.getWhiskiesForDistillery(whisky.id);
    }
    res.status(statusCodes.OK).json(distilleries);
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



