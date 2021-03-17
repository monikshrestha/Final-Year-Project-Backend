const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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

//set view engine
app.set("view engine", "ejs");
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));

app.get("/support", (req, res) => {
  db.query("SELECT * FROM app_feedback", (err, row) => {
    if (err) throw err;
    res.render("support_index", {
      title: "Support Page",
      app_feedback: row,
    });
  });
});



app.get("/notification", (req, res) => {
  res.render("notification_index", {
    title: "Notification Page",
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard_index", {
    title: "Dashboard Page",
  });
});

app.get("/user", (req, res) => {
  res.render("user_index", {
    title: "User Page",
  });
});


app.post("/api/register", (req, res) => {
  const uname = req.body.uname;
  const uemail = req.body.uemail;
  const upassword = req.body.upassword;
  const sqlInsert ="INSERT INTO users (uname, uemail, upassword) VALUES (?,?,?)";
  db.query(sqlInsert, [uname, uemail, upassword], (err,result)=>{
    if (!err) res.send(result);
    else res.send(err);
  });
});

app.post("/register", (req, res) => {
  const uname = req.body.uname;
  const uemail = req.body.uemail;
  const upassword = req.body.upassword;

  db.query("SELECT * FROM users WHERE uemail = ? and password = ?", [uname, uemail, upassword], (err,result)=>{
    if (!err) res.send({err:err});

    if (result){
      res.send(result);
    }
      else {
        res.send({message: "Wrong email and password"})
      }
  });
});

app.post("/api/insert", (req, res) => {
    console.log(req.body);
    const fedName = req.body.fedName;
    const fedEmail = req.body.fedEmail;
    const fedfedback = req.body.fedfedback;
    const sqlInsert ="INSERT INTO app_feedback (fedName, fedEmail, fedfedback) VALUES (?,?)";
    db.query(sqlInsert, [fedName, fedEmail, fedfedback], (err,result)=>{
      if (!err) res.send(result);
      else res.send(err);
    });
});

// app.get("/", (req, res) => {
//   // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
//   db.query("SELECT * FROM app_feedback", (err, row) => {
//     if (err) throw err;
//     res.render("support_index", {
//       title: "Dashboard Page",
//       app_feedback: row,
//     });
//   });
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

app.listen(3001, '0.0.0.0', () => {
  console.log("Running on the port: 3001");
});
