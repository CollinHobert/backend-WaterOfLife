// import database from sqlite
import Database from "better-sqlite3";
import {prepare} from "better-sqlite3/lib/methods/wrappers.js";

// Dummy data
// Some created data of whisky-objects stored in an array 'whiskies' to have some dummy data to start with
let whisky1 = {
    image : "../../assets/whiskies/talisker-skye.jpg",
    name : "Talisker Skye",
    description : "Talisker Skye biedt een rond, zoet smaakprofiel met verse citrus, zoete rook, scherpe kruiden en traditionele ziltige Talisker tonen. " +
        "\nToegankelijker, maar onmiskenbaar Talisker.",
    age : 10,
    type : "Single Malt",
    distilleryId : 1,
    reviewId : 1
};
let whisky2 = {
    image : "../../assets/whiskies/NikkaFromTheBarrel.jpg",
    name : "Nikka from the Barrel",
    description : "Deze Japanse malt whisky wordt gemaakt door gerijpte malt whisky en graanwhisky te mengen en opnieuw in vaten te leggen. " +
        "\nZo ontstaat er een rijke harmonie van verschillende whisky's. De combinatie van mokka, chocolade en vanille zorgt voor een volle en stevige smaak.",
    age : 10,
    type : "Blended",
    distilleryId : 1,
    reviewId : null
};

let whiskies = [];
whiskies.push(whisky1);
whiskies.push(whisky2);

//Queries
const createWhiskyTable =
    `CREATE TABLE IF NOT EXISTS whiskies (
        whiskyId INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        description TEXT,
        age INTEGER,
        type TEXT,
        distilleryId TEXT,
        reviewId TEXT
          
     );`

const countWhiskiesQuery = `SELECT count(whiskyId) FROM whiskies`;

const insertWhiskyQuery =
    `INSERT INTO whiskies (image, name, description, age, type, distilleryId, reviewId) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
const getWhiskiesByTypeQuery= `SELECT * FROM whiskies WHERE type LIKE ?;`;

// Create a new DB file
let db;
try{
    db = new Database("DB/data.sqlite");

    // Create tables
    db.prepare(createWhiskyTable).run();

    const countResult = db.prepare(countWhiskiesQuery).run();
    console.log(countResult);
    if (countResult['count(whiskyId)'] === 0){
        const insert = prepare(insertWhiskyQuery);
        for (const whisky of whiskies){
            insert.run(whisky.image, whisky.name, whisky.description, whisky.age, whisky.type, whisky.distilleryId, whisky.reviewId);
        }
    }
}catch (e){
    console.error("Error while initializing db! " + e);
    throw e;
}

// Export function
export function getWhiskiesByType(){
    return db.prepare(getWhiskiesByTypeQuery()).all(`%${type}%`);

}