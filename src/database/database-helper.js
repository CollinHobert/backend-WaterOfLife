// import database from sqlite
import Database from "better-sqlite3";
import * as queries from '../database/queries.js';

/** Used as dummy data for inserting into database **/
/*
const distilleries = [
    {
        name: "Talisker Distillery",
        country: "Scotland",
        region: "Islands - Isle of Skye",
        description: "The Talisker Distillery produces an alluring, sweet, full-bodied single malt that is so easy to enjoy...",
        whiskies: [
            {
                image: "../../assets/whiskies/talisker-skye.jpg",
                name: "Talisker Skye",
                description: "Talisker Skye biedt een rond, zoet smaakprofiel met verse citrus, zoete rook...",
                age: 10,
                type: "Single Malt",
                review: {
                    rating: 9,
                    comment: "I really like this whisky!"
                }
            }
        ]
    },
    {
        name: "Yoichi distillery",
        country: "Japan",
        region: "Hokkaidō",
        description: "The Nikka Whisky Distilling Co. Ltd. is a producer of Japanese whisky...",
        whiskies: [
            {
                image: "../../assets/whiskies/NikkaFromTheBarrel.jpg",
                name: "Nikka from the Barrel",
                description: "Deze Japanse malt whisky wordt gemaakt door gerijpte malt whisky en graanwhisky te mengen...",
                age: 10,
                type: "Blended",
                review: {
                    rating: 8,
                    comment: "This one tastes great!"
                }
            }
        ]
    }
];


// Initializing database, used only once to add the tables and the dummy data.

let db= new Database('db/data.sqlite');
try {

    db.prepare(queries.dropWhiskies).run();
    db.prepare(queries.dropDistilleries).run();
    db.prepare(queries.dropReviews).run();

    // Create the table (if it doesn't exist yet)
    db.prepare(queries.createWhiskyQuery).run();
    db.prepare(queries.createDistilleryQuery).run();
    db.prepare(queries.createReviewQuery).run();

    // Check if the database is empty
    const countResult = db.prepare(queries.countWhiskiesQuery).get();
    if (countResult['count(whiskyId)'] === 0) {
        // Seed the DB with some initial data!
        insertDistillery();
    }
} catch (e) {
    console.error('Error while initializing db!', e);
    throw e;
}

function insertDistillery() {
    const insertDistillery = db.prepare(queries.insertDistilleryQuery);
    const insertWhisky = db.prepare(queries.insertWhiskyQuery);
    const insertReview = db.prepare(queries.insertReviewQuery);

    for (const distillery of distilleries) {
        const { lastInsertRowid: distilleryId } = insertDistillery.run(
            distillery.name,
            distillery.country,
            distillery.region,
            distillery.description
        );

        if (distillery.whiskies && distillery.whiskies.length > 0) {
            for (const whisky of distillery.whiskies) {
                const { lastInsertRowid: whiskyId } = insertWhisky.run(
                    whisky.image,
                    whisky.name,
                    whisky.description,
                    whisky.age,
                    whisky.type,
                    distilleryId,
                    null
                );

                if (whisky.review) {
                    const { lastInsertRowid: reviewId } = insertReview.run(
                        whisky.review.rating,
                        whisky.review.comment
                    );

                    db.prepare(queries.updateWhiskyReviewIdQuery).run(reviewId, whiskyId);
                }
            }
        }
    }
}

*/

//Initialize database
let db= new Database('db/data.sqlite');

/** FUNCTIONS **/

// GETS
export function getAllWhiskies() {
    return db.prepare(queries.getAllWhiskiesQuery).all();
}
export function getWhiskyById(id) {
    return db.prepare(queries.getWhiskyById).get(id);
}
export function getWhiskiesByType(type) {
    return db.prepare(queries.getWhiskiesByTypeQuery + `'${type}%'`).all();
}

export function getWhiskyByName(name) {
    return db.prepare(queries.getWhiskyByNameQuery + `'%${name}%'`).all();
}
export function getWhiskiesForDistillery(distilleryId) {
    return db.prepare(queries.getWhiskiesForDistillery).all(distilleryId);
}
export function getAllDistilleries() {
    return db.prepare(queries.getAllDistilleriesQuery).all();
}
export function getDistilleryById(id) {
    return db.prepare(queries.getDistilleryById).get(id);
}
export function getDistilleryByName(name) {
    return db.prepare(queries.getWhiskyByNameQuery + `'%${name}%'`).all();
}
export function getReviewById(id) {
    return db.prepare(queries.getReviewById).get(id);
}

// POSTS
export function postDistillery(distillery) {
    const preparedQuery = db.prepare(queries.insertDistilleryQuery);
    preparedQuery.run(distillery.name, distillery.country, distillery.region, distillery.description);
}
export function postWhisky(whisky) {
    // Prepare the insert query for a whisky
    const preparedQuery = db.prepare(queries.insertWhiskyQuery);

    // get the reviewId of the review that belongs to this whisky, the review that is posted right before this whisky.
    const result = db.prepare(queries.getLatestReviewId).get();

    // parse the result to an int, so that it can be inserted with the whisky as the reviewId
    const reviewId = parseInt(result.reviewId);

    preparedQuery.run(whisky.image, whisky.name, whisky.description, whisky.age, whisky.type, whisky.distilleryId, reviewId);
}
export function postReview(review) {
    const preparedQuery = db.prepare(queries.insertReviewQuery);
    preparedQuery.run(review.rating, review.comment);
}

// PUTS
export function putDistilleryById(id, distillery){
    const preparedQuery = db.prepare(queries.putDistilleryById);
    preparedQuery.run(distillery.name, distillery.country, distillery.region, distillery.description, id);
}
export function putWhiskyById(id, whisky){
    const preparedQuery = db.prepare(queries.putWhiskyById);
    preparedQuery.run(whisky.image, whisky.name, whisky.description, whisky.age, whisky.type, whisky.distilleryId, id);
}
export function putReviewById(id, review){
    const preparedQuery = db.prepare(queries.putReviewById);
    preparedQuery.run(review.rating, review.comment, id);
}

// DELETES
export function deleteDistilleryById(id){
    const preparedQuery = db.prepare(queries.deleteDistilleryById);
    preparedQuery.run(id);
}
export function deleteWhiskyById(id){
    const preparedQuery = db.prepare(queries.deleteWhiskyById);
    preparedQuery.run(id);
}
export function deleteReviewById(id){
    const preparedQuery = db.prepare(queries.deleteReviewById);
    preparedQuery.run(id);
}