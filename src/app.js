const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast');
// Define paths for express config

const publicFolder = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HandleBars and views location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicFolder));
//Routing
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ankit',
  });
});
app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide a address',
    });
  }
  geoCode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      res.send({ error });
    } else {
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            location,
            forecast,
          });
        }
      });
    }
  });
});
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ankit',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ankit',
    message: 'How may I help you',
  });
});
app.get('/help/*', (req, res) => {
  res.render('notFound', {
    isHelp: 'Help Article Not found',
    title: '404',
    name: 'Ankit',
  });
});
app.get('*', (req, res) => {
  res.render('notFound', {
    isHelp: 'Page not found',
    title: '404',
    name: 'Ankit',
  });
});
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
