
/** QUERIES **/

/* CREATE TABLE */
export const createWhiskyQuery =
    `CREATE TABLE IF NOT EXISTS whisky (
        whiskyId INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        description TEXT,
        age INTEGER,
        type TEXT,
        distilleryId INTEGER NOT NULL,
        reviewId INTEGER,
        FOREIGN KEY (distilleryId) REFERENCES distillery(distilleryId),
        FOREIGN KEY (reviewId) REFERENCES review(reviewId) ON DELETE CASCADE
     );`;

export const createDistilleryQuery =
    `CREATE TABLE IF NOT EXISTS distillery (
        distilleryId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        country TEXT,
        region TEXT,
        description TEXT
     );`;

export const createReviewQuery =
    `CREATE TABLE IF NOT EXISTS review (
        reviewId INTEGER PRIMARY KEY AUTOINCREMENT,
        rating INTEGER NOT NULL,
        comment TEXT
     );`;

/* DELETE TABLE */
export const dropWhiskies = `DROP TABLE IF EXISTS whisky;`
export const dropDistilleries = `DROP TABLE IF EXISTS distillery;`
export const dropReviews = `DROP TABLE IF EXISTS review;`

/* INSERTS */
export const insertWhiskyQuery = `INSERT INTO whisky (image, name, description, age, type, distilleryId, reviewId) VALUES (?,?,?,?,?,?,?);`;
export const insertDistilleryQuery = `INSERT INTO distillery (name, country, region, description) VALUES (?,?,?,?);`;
export const insertReviewQuery = `INSERT INTO review (rating, comment) VALUES (?,?);`;

/* SELECTS */
// Whisky gets
export const getAllWhiskiesQuery = `SELECT * FROM whisky;`;
export const getWhiskyById = `SELECT * FROM whisky WHERE whiskyId = ?;`;
export const getWhiskiesByTypeQuery = `SELECT * FROM whisky WHERE type LIKE `;
export const getWhiskyByReviewRatingQuery = `SELECT w.* FROM Whisky w JOIN Review r ON w.reviewId = r.reviewId WHERE r.rating = ?;`;
export const getWhiskyByRatingAndTypeQuery = `SELECT w.* FROM Whisky w JOIN Review r ON w.reviewId = r.reviewId WHERE r.rating = ? AND w.type = ?;`;

// Distillery gets
export const getAllDistilleriesQuery = `SELECT * FROM distillery;`;
export const getDistilleryById = `SELECT * FROM distillery WHERE distilleryId = ?;`;
export const getDistilleriesByTypeQuery = `SELECT * FROM distillery WHERE country LIKE `;

// Review gets
export const getReviewById = `SELECT * FROM review WHERE reviewId = ?;`;

/* UPDATE OBJECTS */
export const putDistilleryById = `UPDATE distillery SET name = ?, country = ?, region = ?, description = ? WHERE distilleryId = ?;`;
export const putWhiskyById = `UPDATE whisky SET image = ?, name = ?, description = ?, age = ?, type = ?, distilleryId = ? WHERE whiskyId = ?;`;
export const putReviewById = `UPDATE review SET rating = ?, comment = ? WHERE reviewId = ?;`;

/* DELETES */
export const deleteWhiskyById = `DELETE FROM whisky WHERE whiskyId = ?;`;
export const deleteDistilleryById = `DELETE FROM distillery WHERE distilleryId = ?;`;
export const deleteReviewById = `DELETE FROM review WHERE reviewId = ?;`;

/* HELPER QUERIES */
export const getLatestReviewId =  `SELECT reviewId FROM review ORDER BY reviewId DESC LIMIT 1;`;
export const countWhiskiesQuery = `SELECT count(whiskyId) FROM whisky;`;
export let updateWhiskyReviewIdQuery = `UPDATE whisky SET reviewId = ? WHERE whiskyId = ?;`;