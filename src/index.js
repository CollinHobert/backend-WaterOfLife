// Requiring the module and initializing express
const express = require('express');
const url = require("url");
const app = express();

// Creating a port variable to listen on later
const port = 3000;


// Some created data of review-objects stored in an array 'reviews' to have some dummy data to start with
let review1={
    reviewId : 1,
    rating : 9,
    comment : "I really like this whisky!"
}

let review2={
    reviewId : 2,
    rating : 8,
    comment : "This one tastes great!"
}
let reviews= [];
reviews.push(review1);
reviews.push(review2);


// Some created data of whisky-objects stored in an array 'whiskies' to have some dummy data to start with
let whisky1 = {
    whiskyId : 1,
    image : "",
    name : "Talisker Skye",
    description : "Talisker Skye biedt een rond, zoet smaakprofiel met verse citrus, zoete rook, scherpe kruiden en traditionele ziltige Talisker tonen. " +
        "\nToegankelijker, maar onmiskenbaar Talisker.",
    age : 10,
    type : "Single Malt",
    distillery : "",
    review : review1
};
let whisky2 = {
    whiskyId : 2,
    image : "",
    name : "Nikka from the Barrel",
    description : "Deze Japanse malt whisky wordt gemaakt door gerijpte malt whisky en graanwhisky te mengen en opnieuw in vaten te leggen. " +
        "\nZo ontstaat er een rijke harmonie van verschillende whisky's. De combinatie van mokka, chocolade en vanille zorgt voor een volle en stevige smaak.",
    age : 10,
    type : "Blended",
    distillery : "",
    review : review2
};
let whiskies = [];
whiskies.push(whisky1);
whiskies.push(whisky2);

// Some created data of distillery-objects stored in an array 'distilleries' to have some dummy data to start with
let distillery1={
    distilleryId : 1,
    name : "Talisker Distillery",
    country : "Scotland",
    region : "Islands - Isle of Skye",
    description : "The Talisker Distillery produces an alluring, sweet, full-bodied single malt that is so easy to enjoy, and like Skye itself, so hard to leave. " +
        "\nOn the shores of the Isle of Skye, where rugged coastlines meet the raging sea, you find adventure in a bottle. " +
        "\nTalisker single malt scotch whisky captures the elemental wildness and unadulterated beauty of its birthplace to give you a taste of Skye in every sip.",
    whiskies : whisky1
}
let distillery2={
    distilleryId : 2,
    name : "Yoichi distillery",
    country : "Japan",
    region : "Hokkaidō",
    description : "The Nikka Whisky Distilling Co. Ltd. is a producer of Japanese whisky and other beverages headquartered in Tokyo. It is owned by Asahi Group Holdings." +
        "\nThe company operates a number of distilleries and other facilities in Japan, including two Japanese whisky distilleries, the Yoichi distillery in Yoichi, Hokkaidō (established in 1934), " +
        "\nand the Miyagikyo distillery in Aoba-ku, Sendai, Miyagi Prefecture, Northern Honshū (established in 1969). It also owns the Ben Nevis Distillery (acquired in 1989) in Scotland.",
    whiskies : whisky2
}
let distilleries= [];
distilleries.push(distillery1);
distilleries.push(distillery2);

/**
 * GET requests
 */
app.get('/whiskies', function (req, res){
    if (whiskies === undefined){
        res.status(404).send("List of whiskies does not exist!");
    }
    res.status(200).send(whiskies);
})
/*
app().get('/whiskies/:whiskyId', function (req, res){
    const number = req.params.id;

    res.status(200).send(`Whisky with id ${id} here!`);
});



/**
 * POST requests
 */
/*
app().post('/', function (req, res){
    res.post();
});


/**
 * PUT requests
 */
/*
app().put('/', function (req, res){
    res.put();
});

/**
 * DELETE requests
 */
/*
app().delete('/', function (req, res){
    res.delete();
});
*/


// Server setup, listening on port 3000 (port variable)
app.listen(port, function() {
    console.log(`Server listening on port ${port}!`);
});

/* HELPER FUNCTIONS */

function returnWhiskyById(id){
    for (const whisky of whiskies){
        if (whisky.id == id){
            return whisky;
        }
    }
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