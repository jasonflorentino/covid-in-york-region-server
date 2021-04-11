const express = require('express');
const router = express.Router();
const dailiesService = require('./dailies.service');

// routes
router.get('/', getAll);

module.exports = router;

function getAll(req, res, next) {
  dailiesService.getAll()
    .then(dailies => res.status(200).json(dailies))
    .catch(err => next(err));
}