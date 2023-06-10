// Some created data of cat-objects stored in an array cats to have some dummy data to start with
import statusCodes from "http-status-codes";

// Internal import
import * as db from "../database/database-helper.js";

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
    whiskyId : 2,
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
    whiskies : whiskies
}
let distilleries= [];
distilleries.push(distillery1);
distilleries.push(distillery2);


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