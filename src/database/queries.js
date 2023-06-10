// QUERIES

// CREATE TABLE
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
        FOREIGN KEY (reviewId) REFERENCES review(reviewId)
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

// DELETE TABLE
export const dropWhiskies = `DROP TABLE IF EXISTS whisky;`
export const dropDistilleries = `DROP TABLE IF EXISTS distillery;`
export const dropReviews = `DROP TABLE IF EXISTS review;`

// INSERTS
export const insertWhiskyQuery = `INSERT INTO whisky (image, name, description, age, type, distilleryId, reviewId) VALUES (?,?,?,?,?,?,?);`;
export const insertDistilleryQuery = `INSERT INTO distillery (name, country, region, description) VALUES (?,?,?);`;
export const insertReviewQuery = `INSERT INTO review (rating, comment) VALUES (?,?);`;

// SELECTS
export const getAllWhiskiesQuery = `SELECT * FROM whisky;`;
export const getWhiskyById = `SELECT * FROM whisky WHERE id = ?;`;
export const getWhiskiesByTypeQuery = `SELECT * FROM whisky WHERE type LIKE `;
export const getWhiskiesForDistillery = `SELECT * FROM whisky WHERE distilleryId = ?;`;
export const getWhiskyByNameQuery = `SELECT * FROM whisky WHERE name = ?;`;

export const countWhiskiesQuery = `SELECT count(whiskyId) FROM whisky;`;

// DELETES OBJECTS
export const deleteWhiskyById = `DELETE FROM whisky WHERE id = ?;`;