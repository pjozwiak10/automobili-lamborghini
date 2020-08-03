const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json({ msg: 'Please enter all fields' });
  if (!email.includes('@')) return res.status(400).json({ msg: `Please enter the sign '@' in email` })

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => res.status(200).json({ success: true, msg: 'User successfully registered' }))
          .catch(err => res.status(404).json({ success: false }))
      })
    })
  }).catch(err => res.status(404).json({ success: false }))
})

module.exports = router;