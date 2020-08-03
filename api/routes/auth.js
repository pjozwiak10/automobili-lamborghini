const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const User = require('../models/User');

const auth = require('../middleware/is-auth');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: 'Please enter all fields' });

  User.findOne({ email }).populate('cars')
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      bcrypt.compare(password, user.password).then(correct => {
        if (!correct) return res.status(400).json({ msg: 'Invalid credentials' })

        jwt.sign({ id: user._id }, process.env.JWT_KEY_SECRET, (err, token) => {
          if (err) throw err;
          res.setHeader('Set-Cookie', cookie.serialize('access_token', token, { httpOnly: true, maxAge: 3600, sameSite: true, path: '/api' }))
          res.status(200).json({
            success: true, user: {
              _id: user._id, name: user.name, email: user.email,
              cars: user.cars.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
          })
        })
      }).catch(err => res.status(400).json({ success: false }))
    }).catch(err => res.status(400).json({ success: false }))
})

router.get('/', auth, (req, res) => {
  User.findById(req.user.id).select('_id name email cars').populate({ path: 'cars', options: { sort: { createdAt: -1 } } })
    .then(user => res.status(200).json({ success: true, user }))
    .catch(err => res.status(400).json({ success: false, err }))
})

router.get('/logout', auth, (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize('access_token', '', { maxAge: 0, path: '/api', httpOnly: true, sameSite: true }))
  res.status(200).json({ success: true, msg: 'User successfully logout' });
})

module.exports = router;