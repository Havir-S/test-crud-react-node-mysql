const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUDDatabase'
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())

app.get('/', (req,res) => {
    // const sqlINSERT = 'INSERT INTO movie_reviews (movieName, movieReview) VALUES ("Inception", "good movie");'
    // db.query(sqlINSERT, (err, result) => {
    //     res.send('hello world')
    // })
    
})


app.get('/api/get', (req,res) => {
    const sqlSELECT = `SELECT * FROM movie_reviews`
    db.query(sqlSELECT, (err, result) => {
        res.send(result)

    })
})

app.post('/api/insert', (req,res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    console.log('we are here')

    const sqlINSERT = `INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);`
    db.query(sqlINSERT, [movieName, movieReview], (err, result) => {
        console.log(err)

    })
})

app.delete('/api/delete/:movieName', (req,res) => {
    const name = req.params.movieName;

    const sqlDELETE = `DELETE FROM movie_reviews WHERE movieName = ?`
    db.query(sqlDELETE, name, (err, result) => {
        if (err) console.log(err)

    })
})

app.put('/api/update', (req,res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;

    const sqlUPDATE = `UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?`
    db.query(sqlUPDATE, [review, name], (err, result) => {
        if (err) console.log(err)

    })
})

app.listen(3001);