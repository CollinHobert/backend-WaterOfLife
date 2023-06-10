// Requiring the modules
// Import external modules
import express from "express";
import cors from "cors";
import statusCodes from 'http-status-codes';


// Import internal modules
import whiskyRouter from "../src/routers/whisky-router.js";
import distilleryRouter from "../src/routers/distillery-router.js";
import reviewRouter from "../src/routers/review-router.js";

//initializing express
const app = express();

// Creating a port variable to listen on later
const port = 3000;

// Body can use json
app.use(cors());
app.use(express.json());

// Use routers
app.use("/whiskies", whiskyRouter);
app.use("/distilleries", distilleryRouter);
app.use("/review", reviewRouter);

//
// /**
//  * GET requests
//  */
// //returns list of whiskies
// app.get('/whiskies', function (req, res){
//     // const type = req.query.type;
//     // const description = req.query.description;
//
//     if (whiskies === undefined){
//         res.status(404).send("List of whiskies does not exist!");
//     }
//
//     // if (returnWhiskiesByType(type) === undefined) {
//     //     res.status(404).send("There are no whiskies with type: " + type);
//     // }else if (type === null || type === undefined){
//     //     res.status(404).send("Type: " + type + " does not exist!");
//     // }
//
//     //console.log(returnWhiskiesByType(type))
//     res.status(200).send(whiskies);
//     //res.status(200).send(whiskies);
// })
//
// // returns whisky by id
// app.get('/whiskies/:whiskyId', function (req, res){
//     const id = req.params.whiskyId;
//
//     if (returnWhiskyById(id) === undefined){
//         res.status(404).send("Whisky with id " + id + " does not exist!");
//     }
//     res.status(200).send(returnWhiskyById(id));
// });
//
// //returns list of distilleries
// app.get('/distilleries', function (req, res){
//     if (distilleries === undefined){
//         res.status(404).send("List of distilleries does not exist!");
//     }
//     res.status(200).send(distilleries);
// })
//
// //returns distillery by id
// app.get('/distilleries/:distilleryId', function (req, res){
//     const id = req.params.distilleryId;
//
//     if (returnDistilleryById(id) === undefined){
//         res.status(404).send("Distillery with id " + id + " does not exist!");
//     }
//     res.status(200).send(returnDistilleryById(id));
// });
// //returns a list of whiskies of the distillery with the given id
// app.get('/distilleries/:distilleryId/whiskies', function (req, res){
//     const id = req.params.distilleryId;
//
//     if (returnWhiskiesByDistilleryId(id) === undefined){
//         res.status(404).send("Distillery with id " + id + " does not exist!");
//     }
//     res.status(200).send(returnWhiskiesByDistilleryId(id));
// });
//
// //returns the review of the whisky with the given id
// app.get('/whiskies/:whiskyId/review', function (req, res){
//     const id = req.params.whiskyId;
//     const review = returnReviewByWhiskyId(id);
//     if (returnReviewByWhiskyId(id) === undefined) {
//         res.status(404).send("Whisky with id " + id + " does not exist!");
//     }else if (review === null || review === undefined){
//         res.status(404).send("Whisky with id " + id + " does not have a review!");
//     }
//     res.status(200).send(returnReviewByWhiskyId(id));
// });
//
// //returns a list of whiskies of a certain type (single malt, blended etc.)
// // app.get('/whiskies', function (req, res){
// //     const type = req.query.type;
// //
// //
// // });
//
//
//
// //returns a list of distilleries from the given country
// app.get('/distilleries', function (req, res){
//     const country = req.query.country;
//     if (returnDistilleriesByCountry(country) === undefined){
//         res.status(404).send("List of distilleries does not exist!");
//     }else if (country === null || country === undefined){
//         res.status(404).send("Country: " + country + " does not exist!");
//     }
//     res.status(200).send(returnDistilleriesByCountry(country));
// })
//
// //returns a list of whiskies that have the given keyword in the description
// /*
// app.get('/whiskies', function (req, res){
//     const keyword = req.query.description;
//     if (returnWhiskiesByKeyword(keyword) === undefined){
//
//         res.status(404).send("List of distilleries does not exist!");
//     }else if (country === null || country === undefined){
//         res.status(404).send("Country: " + country + " does not exist!");
//     }
//     res.status(200).send(returnDistilleriesByCountry(country));
// })
//
//  */
//
// /**
//  * POST requests
//  */
//
// // POST endpoint for adding a whisky
// app.post('/whiskies', (req, res) => {
//   const whisky = req.body;
//   whiskies.push(whisky);
//   res.status(201).json(whisky);
// });
//
// /**
//  * PUT requests
//  */
// /*
// app.put('/', function (req, res){
//     res.put();
// });
//
// /**
//  * DELETE requests
//  */
// /*
// app.delete('/', function (req, res){
//     res.delete();
// });
// */


// Server setup, listening on port 3000 (port variable)
app.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});

/* HELPER FUNCTIONS */



function returnDistilleryById(id){
    for (const distillery of distilleries){
        if (distillery.distilleryId == id){
            return distillery;
        }
    }
}

function returnWhiskiesByDistilleryId(id) {
    for (const distillery of distilleries){
        if (distillery.distilleryId == id){
            return distillery.whiskies;
        }
    }
}

function returnReviewByWhiskyId(id) {
    for (const whisky of whiskies){
        if (whisky.whiskyId == id){
            return whisky.review;
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

function returnDistilleriesByCountry(country) {
    let distilleriesByCountry = [];
    for (const distillery of distilleries) {
        if (distillery.country === country) {
            distilleriesByCountry.push(distillery);
        }
    }
    return distilleriesByCountry;
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