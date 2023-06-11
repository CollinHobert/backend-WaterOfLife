// import database from sqlite
import Database from "better-sqlite3";
import {prepare} from "better-sqlite3/lib/methods/wrappers.js";
import * as queries from '../database/queries.js';

// // Some created data of review-objects stored in an array 'reviews' to have some dummy data to start with
// let review1={
//     reviewId : 1,
//     rating : 9,
//     comment : "I really like this whisky!"
// }
//
// let review2={
//     reviewId : 2,
//     rating : 8,
//     comment : "This one tastes great!"
// }
// let reviews= [];
// reviews.push(review1);
// reviews.push(review2);
//
// // Some created data of whisky-objects stored in an array 'whiskies' to have some dummy data to start with
// let whisky1 = {
//     whiskyId : 1,
//     image : "../../assets/whiskies/talisker-skye.jpg",
//     name : "Talisker Skye",
//     description : "Talisker Skye biedt een rond, zoet smaakprofiel met verse citrus, zoete rook, scherpe kruiden en traditionele ziltige Talisker tonen. " +
//         "\nToegankelijker, maar onmiskenbaar Talisker.",
//     age : 10,
//     type : "Single Malt",
//     distilleryId : 1,
//     reviewId : 1
// };
// let whisky2 = {
//     whiskyId : 2,
//     image : "../../assets/whiskies/NikkaFromTheBarrel.jpg",
//     name : "Nikka from the Barrel",
//     description : "Deze Japanse malt whisky wordt gemaakt door gerijpte malt whisky en graanwhisky te mengen en opnieuw in vaten te leggen. " +
//         "\nZo ontstaat er een rijke harmonie van verschillende whisky's. De combinatie van mokka, chocolade en vanille zorgt voor een volle en stevige smaak.",
//     age : 10,
//     type : "Blended",
//     distilleryId : 1,
//     reviewId : null
// };
//
// let whiskies = [];
// whiskies.push(whisky1);
// whiskies.push(whisky2);
//
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
/**
let distilleries = [];

let reviews = [
    {
        reviewId: 1,
        rating: 9,
        comment: "I really like this whisky!",
    },
    {
        reviewId : 2,
        rating : 8,
        comment : "This one tastes great!"
    }
    // Add more reviews as needed
];

let whiskies = [
    {
        distilleryId: 1,
        reviewId: 1,
        image: "../../assets/whiskies/talisker-skye.jpg",
        name: "Talisker Skye",
        description: "Talisker Skye biedt een rond, zoet smaakprofiel met verse citrus, zoete rook, scherpe kruiden en traditionele ziltige Talisker tonen. \nToegankelijker, maar onmiskenbaar Talisker.",
        age: 10,
        type: "Single Malt",
    },
    {
        distilleryId: 2,
        reviewId: 2,
        image : "../../assets/whiskies/NikkaFromTheBarrel.jpg",
        name : "Nikka from the Barrel",
        description : "Deze Japanse malt whisky wordt gemaakt door gerijpte malt whisky en graanwhisky te mengen en opnieuw in vaten te leggen. " +
            "\nZo ontstaat er een rijke harmonie van verschillende whisky's. De combinatie van mokka, chocolade en vanille zorgt voor een volle en stevige smaak.",
        age : 10,
        type : "Blended",
    }
    // Add more whiskies as needed
];

distilleries.push({
    distilleryId: 1,
    name: "Talisker Distillery",
    country: "Scotland",
    region: "Islands - Isle of Skye",
    description:
        "The Talisker Distillery produces an alluring, sweet, full-bodied single malt that is so easy to enjoy, and like Skye itself, so hard to leave. " +
        "\nOn the shores of the Isle of Skye, where rugged coastlines meet the raging sea, you find adventure in a bottle. " +
        "\nTalisker single malt scotch whisky captures the elemental wildness and unadulterated beauty of its birthplace to give you a taste of Skye in every sip.",
    whiskies: [whiskies[0]], // Link whisky by reference
});
distilleries.push({
    distilleryId : 2,
    name : "Yoichi distillery",
    country : "Japan",
    region : "Hokkaidō",
    description : "The Nikka Whisky Distilling Co. Ltd. is a producer of Japanese whisky and other beverages headquartered in Tokyo. It is owned by Asahi Group Holdings." +
        "\nThe company operates a number of distilleries and other facilities in Japan, including two Japanese whisky distilleries, the Yoichi distillery in Yoichi, Hokkaidō (established in 1934), " +
        "\nand the Miyagikyo distillery in Aoba-ku, Sendai, Miyagi Prefecture, Northern Honshū (established in 1969). It also owns the Ben Nevis Distillery (acquired in 1989) in Scotland.",
})
**/

// INIT
let db;
try {
    db = new Database('db/data.sqlite');

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
/**
// HELPER FUNCTION for ADDING DUMMY DATA
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
        console.log(distillery.name);
        console.log(distillery.country);
        console.log(distillery.region);
        console.log(distillery.description);

        if (distillery.whiskies && distillery.whiskies.length > 0) {
            for (const whisky of distillery.whiskies) {
                console.log("image:" + whisky.image);
                console.log("name:" +  whisky.name);
                console.log("desc:" + whisky.description);
                console.log("age:" + whisky.age);
                console.log("type:" + whisky.type);
                console.log("distilleryId:" + whisky.distilleryId);
                console.log("reviewId:" + whisky.reviewId);
                const { lastInsertRowid: whiskyId } = insertWhisky.run(
                    whisky.image,
                    whisky.name,
                    whisky.description,
                    whisky.age,
                    whisky.type,
                    distilleryId,
                    whisky.reviewId
                );

                if (whisky.reviewId) {
                    const review = reviews.find((review) => review.reviewId === whisky.reviewId);
                    console.log("reviewid: " + review.reviewId);
                    console.log("reviewid: " + review.rating);
                    console.log("reviewid: " + review.comment);
                    console.log("whiskyId: " + whiskyId);
                    if (review) {
                        insertReview.run(whiskyId, review.rating, review.comment);
                    }
                }
            }
        }
    }
}
**/
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

// FUNCTIONS
export function getAllWhiskies() {
    return db.prepare(queries.getAllWhiskiesQuery).all();
}
export function getWhiskyById(id) {
    return db.prepare(queries.getWhiskyById).get(id);
}
export function getWhiskiesByType(){
    return db.prepare(queries.getWhiskiesByTypeQuery + `'%${name}%'`).all();
}
export function getWhiskyByName(name) {
    return db.prepare(queries.getWhiskyByNameQuery + `'%${name}%'`).all();
}
export function getWhiskiesForDistillery(distilleryId) {
    return db.prepare(queries.getWhiskiesForDistillery).all(distilleryId);
}
export function deleteWhiskyById(id) {
    return db.prepare(queries.deleteWhiskyById).run(id);
}