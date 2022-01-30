const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jnitro5635',
    database: 'billshub',
})
const port = 3001;

app.use(cors());
app.use(express.json());

db.connect((err) => {
    if (err) throw err
    return console.log('connected to datastore')
})

app.get("/api/home", (req, res) => {
    const sql = "SELECT * FROM billshub.bills";
    db.query(sql, (error, response) => {
        res.send(response)
    })
})

app.listen(port, () => {
    console.log(`running on port: ${port}`)
})