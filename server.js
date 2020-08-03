const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const auth = require('./api/routes/auth');
const registration = require('./api/routes/registration');
const cars = require('./api/routes/cars');
const rides = require('./api/routes/rides');

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000/', 'https://automobili-lamborghini-mern.herokuapp.com/'];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    cors({ origin: origin, credentials: true, });
  }
  return next();
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use('/api/registration', registration);
app.use('/api/auth', auth);
app.use('/api/cars', cars);
app.use('/api/test-rides', rides);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))