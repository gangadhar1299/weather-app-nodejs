const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    axios.get(url, {
        params: {
            lat: latitude,
            lon: longitude,
            units: 'metric',
            appid: '329b281810dc77cd2403e445413f6e23'
        }
    })
        .then(({ data }) => { callback(undefined, data) })
        .catch(error => callback('Something went wrong', undefined));
}

module.exports = forecast;