const db = require("../database/database");

// Get hotword in DB
const getHotWordInDb = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hotwords ', (error, results) => {
      if (error) {
        console.log("Error: ", error);
        reject(error);
      }
      resolve(results.rows)
    })
  });
}

// Get HotWord From Source
const getHotWordFromSource = (source) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hotwords WHERE source = $1', [source], (error, results) => {
      if (error) {
        console.log("Error: ", error);
        reject(error);
      }
      resolve(results.rows)
    })
  });
}

// save to DB
const saveHotWordToDB = (hotWord) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO hotwords (name, count, source) VALUES ($1, $2, $3)',
      [hotWord.name, hotWord.count, hotWord.source], (error, results) => {
        if (error) {
          console.log("Error: ", error);
          reject(error);
        }
        resolve(results.rows);
      })
  })
}


module.exports = {
  getHotWordInDb,
  getHotWordFromSource,
  saveHotWordToDB,
}
