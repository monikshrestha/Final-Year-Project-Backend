const db = require("../database");

const router = require("express").Router();

const deleteQuery = "DELETE FROM app_feedback WHERE fed_id =?";

module.exports = router.get("/feedbackdel/:fed_id", (req, res) => {
  const { id } = req.params.fed_id;
  console.log(id);

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
  
});