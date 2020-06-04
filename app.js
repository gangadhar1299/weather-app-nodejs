const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

// const location = process.argv[2];

// geoCode(location, (error, data) => {
//     if (error)
//         console.log(error);
//     else
//         forecast(data.latitude, data.longitude, (error, data) => {
//             if (error)
//                 console.log(error);
//             else
//                 console.log(`Currently in ${location} the temperature is ${data.temp} deg celsius and feels like ${data.feels_like} deg celsius.`);
//         });
// });

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Adam'
    });
});

app.get('/weather', (req, res) => {
    const location = req.query.address;

    geoCode(location, (error, data = {}) => {
        if (error)
            return res.send({ error });

        forecast(data.latitude, data.longitude, (error, data) => {
            if (error)
                return res.send({ error });
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        aboutText: 'This app shows real time weather data',
        author: 'Adam'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Adam',
        helpText: 'Help Page'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather App',
        author: 'Adam',
        errorText: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
