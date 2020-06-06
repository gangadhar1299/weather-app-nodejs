const axios = require('axios');

const geoCode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiZ2FnYW4xNCIsImEiOiJja2F0YmFkNnEwcnVqMzFvY28xc2czeGUyIn0.3X8V4gC-7onbKBTCWC07Og&limit=1`;

    axios.get(url).then(response => {
        const latitude = response.data.features[0].center[1];
        const longitude = response.data.features[0].center[0];
        const place = response.data.features[0].place_name;
        if (response.data.features[0])
            callback(undefined, { latitude, longitude, place });
        else callback('Location not found, try different location', undefined)
    }).catch(error => callback('Something went wrong', undefined));
}

module.exports = geoCode;