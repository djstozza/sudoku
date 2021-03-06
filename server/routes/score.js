const Score = require('../models/score');

const express = require('express');
const router = express.Router();

router.route('/scores').post((req, res) => {
  let score = new Score(req.body);
  score.save()
    .then(score => {
      res.status(200).json({'score': 'Score added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new record');
    });
});

router.route('/scores').get((req, res) => {
  Score.find((err, issues) => {
    if (err) {
      res.json(err);
    } else {
      res.json(issues);
    }
  });
});

module.exports = router;
