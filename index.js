const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sajilodb",
});

db.connect((err) => {
  if (!err) console.log("DB conenction succed");
  else console.log("DB conenction failed");
});

app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/support", (req, res) => {
  // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
  db.query("SELECT * FROM app_feedback", (err, row) => {
    if (err) throw err;
    res.render("support_index", {
      title: "Support Page",
      app_feedback: row,
    });
  });
});

// Viewing the tables from app feedback
// app.get('/api/get', (req, res) => {
//   db.query('SELECT * FROM app_feedback', (err, result) => {
//     if (!err) res.send(result);
//     else console.log(err);
//   });
// });

// app.post("/api/insert", (req, res) => {

//     const fedName = req.body.fedName;
//     const fedEmail = req.body.fedEmail;
//     const fedFedback = req.body.fedfedback;

//     const sqlInsert ="INSERT INTO app_feedback (fedName, fedEmail, fedfedback) VALUES (?,?,?)";
//     db.query(sqlInsert, [fedName, fedEmail, fedFedback], (err,result)=>{
//         console.log(err);
//     });
// });

// Viewing the tables from app feedback
// app.get('/support', (req, res) => {
//   db.query('SELECT * FROM app_feedback', (err, row) => {
//     if (!err) res.send(row);
//     else console.log(err);
//   });
// });

// Deleting the ID from app feedback
// app.delete('/support/:id', (req, res) => {
//     db.query('DELETE FROM app_feedback WHERE fedID =?',[req.params.id], (err, row, fields) => {
//       if (!err) res.send('deleted sucessfully');
//       else console.log(err);
//     });
//   });

// Inserting Value in the database
// app.get("/support", (req, res) => {
//   const sqlInsert ="INSERT INTO app_feedback (fedName, fedEmail, fedfedback) VALUES ('Monik', 'test@gmail.com', 'it works')";
//   db.query(sqlInsert, (err, row) => {
//     if (!err) console.log(row);
//     else console.log(err);
//   });
// });

app.listen(3001, () => {
  console.log("Running on the port: 3001");
});
