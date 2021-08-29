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
  pool.query(sqlText, [id]).then(dbRes => {
    console.log(dbRes.rows[0].genres);
    res.send(dbRes.rows[0].genres);
  }).catch(error => {
    console.log('failed to get movie\'s genres: ', error)
    res.sendStatus(500)
  });
});

module.exports = router;