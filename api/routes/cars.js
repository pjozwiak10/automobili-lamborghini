const express = require('express');
const router = express.Router();

const auth = require('../middleware/is-auth');
const Car = require('../models/Car');
const User = require('../models/User');

router.post('/', auth, (req, res) => {
  const { model, paint, rims, topView, details, userId } = req.body;

  if (!model || !userId) return res.status(400).json({ msg: 'Please enter all fields' });

  User.findById(userId)
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });
      const newCar = new Car({ model, paint, rims, topView, details, user: userId });
      newCar.save()
        .then(car => {
          user.cars = [...user.cars, car];
          user.save()
            .then(user => res.status(200).json({ msg: 'Car successfully created', car }))
            .catch(err => res.status(400).json({ success: false }))
        })
        .catch(err => res.status(400).json({ succes: false }));
    })
    .catch(err => res.status(400).json({ success: false }));
});

module.exports = router;

