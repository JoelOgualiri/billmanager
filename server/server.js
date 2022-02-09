const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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
app.post("/api/addBill", (req, res) => {
    const billName = req.body.bill_name;
    const billAmount = req.body.bill_amount;
    const dueDate = req.body.due_date;
    const reminderLength = req.body.reminder_length || null;
    const reminderColor = req.body.reminder_color || null;
    const billCurrency = req.body.bill_currency || '$';


    const sqlInsert = "INSERT INTO billshub.bills (bill_name, bill_amount,due_date,reminder_length,reminder_color, bill_currency) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [billName, billAmount, dueDate, reminderLength, reminderColor, billCurrency], (err, res) => {
        if (err) console.error(err)
    });
    res.send("new bill added successfully")
})

app.delete("/api/deleteBill/:bill_id", (req, res) => {
    const billID = req.params.bill_id
    const sqlDelete = `DELETE FROM billshub.bills WHERE bill_id = ?`;
    db.query(sqlDelete, [billID], (err, result) => {
        if (err) return console.error(err.message);
        res.send('bill deleted successfully')
    })
})

app.put("/api/updateBill", (req, res) => {
    const billID = req.body.bill_id;
    const billName = req.body.bill_name;
    const billAmount = req.body.bill_amount;
    const dueDate = req.body.due_date;
    const reminderLength = req.body.reminder_length || null;
    const reminderColor = req.body.reminder_color || null;
    const billCurrency = req.body.bill_currency || '$';
    const sqlUpdate = "UPDATE billshub.bills SET bill_name = ?, bill_amount = ?, due_date = ?, reminder_length =?, reminder_color =?,  bill_currency = ? WHERE bill_id = ?";
    db.query(sqlUpdate, [billName, billAmount, dueDate, reminderLength, reminderColor, billCurrency, billID], (err, res) => {
        if (err) console.error(err.message);

    });
    res.send("bill updated successfully")
})
app.listen(port, () => {
    console.log(`running on port: ${port}`)
})