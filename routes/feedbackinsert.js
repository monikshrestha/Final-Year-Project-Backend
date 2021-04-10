const db = require("../database");

const router = require("express").Router();

module.exports = router.post("/feedbackinsert", (req, res) => {
    
    const { fedName,fedEmail, fedfedback} = req.body.values;

    const sqlInsert ="INSERT INTO app_feedback (fedName, fedEmail, fedfedback) VALUES (?,?,?)";
    db.query(sqlInsert, [fedName, fedEmail, fedfedback], (err,result)=>{
      if (!err) res.send(result);
      else res.send(err);
    });
});