// Importing dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors')
const dotenv = require('dotenv');

//connecting the variables
app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

// Checking for connection
db.connect((err) => {
    if (err) return console.log("Error connecting to MYSQL")
        console.log("Connected to MYSQL as id: ", db.threadId)
})

//My codes down here
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1
// // Retrieve all patients
app.get('/data', (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error Retrieving Data');
        } else {
            res.render('data', { results: results });
        }
    });
});

// Question 2 
// Retrieve all providers
app.get('/providers', (req, res) => {
    db.query('SELECT first_name, last_name, specialty FROM providers', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error Retrieving Data');
        } else {
            res.render('data', { results: results });
        }
    });
});

// Question 3
// GET patients by first name
app.get('/patients/:first_name', (req, res) => {
    const { first_name } = req.params;
    db.query('SELECT * FROM patients WHERE first_name = ?', [first_name], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error Retrieving Data');
        } else {
            res.render('data', { results: results });
        }
    });
});

// Question 4
// GET providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    db.query('SELECT first_name, last_name, specialty FROM providers WHERE specialty = ?', [specialty], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error Retrieving Data');
        } else {
            res.render('data', { results: results });
        }
    });
});

// My codes up

// Starting the server
app.listen(process.env.PORT,() => {
    console.log(`server listening on port ${process.env.PORT}`);

    // Messaging the browser
    console.log('Sending the message to the browser...');
    app.get('/', (req, res ) => {
        res.send('Server Started Successfully')
    });

});

