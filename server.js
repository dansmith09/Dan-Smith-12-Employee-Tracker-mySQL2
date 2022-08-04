const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost', // WILL HAVE TO CHANGE THIS WHEN RUNNING ON HEROKU
    user: 'root',
    password: '',
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);


db.query(`
SELECT 
  in_stock,
  COUNT(id) AS total_count 
FROM favorite_books 
GROUP BY in_stock`, function (err, results) {
  console.log(results);
});

// creating routes
app.get('/api/movies', (req, res) => {
    // should SELECT all movies
    // defines our sql query
    const sql = `SELECT * FROM movies`;
    // makes the query to db
    db.query(sql, function (err, results) {
        // logs the request type
        console.log("/api/movies GET request");
        // sends results to the front end
        res.send(JSON.stringify(results));
    })
});

// ** IF WE WANT TO PUT TWO PARAMATERS IN THE SQL QUERY WE USE AN ARRAY
// EG INSERT INTO movies (title, movie_description) VALUES (?, ?)
// EG db.query(sql, [req.body.title, req.body.movie_description])

app.post('/api/add-movie', (req, res) => {
    // should INSERT a new movie
    const sql = `INSERT INTO movies (title) VALUES (?)`;
    db.query(sql, req.body.title, (err, results) => {
        // logs the request type
        console.log("/api/movies GET request");
        // sends results to the front end
        res.send(JSON.stringify(results));
    })
});

app.put('/api/update-review', (req, res) => {
    // req.body.title, req.body.review
    /*
    REQUEST BODY:
    {
        title: "Movie 1",
        review_text: "Sick movie"
    }
    */
   const sql = `
   UPDATE reviews.review
   SET reviews.review_text = ?
   WHERE movies.title = ?
   JOIN movies ON movies.id = reviews.movie_id`;
   db.query(sql, [req.body.review_text, req.body.title], (err, result) => {
        // logs the request type
        console.log("/api/movies post request");
        // sends results to the front end
        res.send(JSON.stringify(results));
   })
});

app.delete('/api/movie/:id', (req, res) => {
    // deletes a route when tested using Insomnia.
    const sql = `DELETE FROM movies WHERE id = ?`;
    db.query(sql, req.params.id, (err, result) => {
        if(err) {
            res.send("There was an error with /api/movie/:id");
        }
        // logs the request type
        console.log("/api/movies post request");
        // sends successful status to front end
        res.status(200);

    })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For project we should make a routes/api.js file and then we can do app.route('api', require('./routes/api'))

// C R U D
// CREATE READ UPDATE DELETE