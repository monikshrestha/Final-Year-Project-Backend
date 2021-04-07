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

app.get("/notification", (req, res) => {
  res.render("notification_index", {
    title: "Notification Page",
  });
});

const loginRouter = require("./routes/login");
app.use(loginRouter);

const registerRouter = require("./routes/register");
app.use(registerRouter);

const feedbackRouter = require("./routes/feedback");
app.use(feedbackRouter);

const socialLogRouter = require("./routes/socialLogin");
app.use(socialLogRouter);

const updateUserRouter = require("./routes/updateUser");
app.use(updateUserRouter);

const profileImageRouter = require("./routes/profileImage");
app.use(profileImageRouter);

const accountDeleteRouter = require("./routes/accountDelete");
app.use(accountDeleteRouter);


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

app.listen(3001, '0.0.0.0', () => {
  console.log("Running on the port: 3001");
});
