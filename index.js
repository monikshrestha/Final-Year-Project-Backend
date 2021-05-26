const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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

const loginRouter = require("./routes/login");
app.use(loginRouter);

const registerRouter = require("./routes/register");
app.use(registerRouter);

const usersRouter = require("./routes/users");
app.use(usersRouter);

const accountDeleteRouter = require("./routes/accountDelete");
app.use(accountDeleteRouter);

const feedbackRouter = require("./routes/feedback");
app.use(feedbackRouter);

const feedbackinsertRouter = require("./routes/feedbackinsert");
app.use(feedbackinsertRouter);

const feedbackdelRouter = require("./routes/feedbackdel");
app.use(feedbackdelRouter);

const userdelRouter = require("./routes/userdel");
app.use(userdelRouter);


const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  // const token = req.body.token;
  // console.log(req.body.token);
  if (!token) {
    res.json({ auth: false, message: "Please provide a token." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: "You failed to authenticate",
        });
      } else {
        req.user_id = decoded.id;
        next();
      }
    });
  }
};
app.post("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ auth: true, message: "You are authenticated" });
});

app.listen(3001, '0.0.0.0', () => {
  console.log("Running on the port: 3001");
});
