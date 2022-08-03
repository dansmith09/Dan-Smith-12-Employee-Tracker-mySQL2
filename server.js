const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'courses_db'
  },
  console.log(`Connected to the courses_db database.`)
);

// Hardcoded query: DELETE FROM course_names WHERE id = 3;
// I suppose ? marks a placeholder for a parameter. The three here is said parameter.
// ? = Paramaterized query.
// The ? says grab the second parameter passed to db.query and replace the ? with it
// In this case. The 3 replaces the ? and IDs with 3 will be deleted
// The Paramaterized query also prevents SQL Injection from malicious users
// This is why we use these instead of template literals

// ALWAYS USE PREPARED STATEMENTS FOR SECURITY REASONS!!

db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM course_names', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
