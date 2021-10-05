const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  const id = req.params.id;
  let sqlText = `SELECT ARRAY_AGG("name") as genres FROM "genres"
                  JOIN "movies_genres"
                    ON "genres"."id" = "movies_genres"."genre_id"
                  JOIN "movies"
                    ON "movies_genres"."movie_id" = "movies"."id"
                  WHERE "movies"."id" = $1
                  GROUP BY "title";`
  // run the query, send back data if it finds anything, otherwise log an error message
  pool.query(sqlText, [id]).then(dbRes => {
    console.log(dbRes.rows[0].genres);
    res.send(dbRes.rows[0].genres);
  }).catch(error => {
    console.log('failed to get movie\'s genres: ', error)
    res.sendStatus(500)
  });
});

// simple get route - grabs all of the genres
router.get('/', (req, res) => {
  const sqlQuery = `SELECT * FROM "genres"`
  pool.query(sqlQuery).then(dbRes => {
    res.send(dbRes.rows);
  }).catch(error => {
    console.log('Failed to get all the genres');
    res.sendStatus(500);
  })
});


module.exports = router;