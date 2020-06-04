const form = document.querySelector('form');
const searchText = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = '';

    axios.get('http://localhost:3000/weather', {
        params: {
            address: searchText.value
        }
    })
        .then(response => {
            searchText.value = '';
            messageOne.innerHTML = response.data.location;
            messageTwo.innerHTML = `Currently in ${response.data.location} the temperature is ${response.data.forecast.temp} deg celsius and feels like ${response.data.forecast.feels_like} deg celsius.`;
        })
        .catch(error => messageOne.value = error);

});
