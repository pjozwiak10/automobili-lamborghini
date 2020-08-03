const express = require('express');
const router = express.Router();

const TestRide = require('../models/TestRide');
const auth = require('../middleware/is-auth');

router.post('/', auth, (req, res) => {
  const { name, email, phone, date, message, model, body } = req.body;

  if (!name || !email || !phone || !date || !model || !body) {
    return res.status(400).json({ succes: false, msg: 'Please enter all fields' });
  };

  const newTestRide = new TestRide({ name, email, phone, date, message, model, body, user: req.user.id })
  newTestRide.save()
    .then(ride => res.status(200).json({ succes: true, msg: 'Your form has been sent' }))
    .catch(err => res.status(400).json({ success: false, msg: 'Something goes wrong' }))
});

module.exports = router;