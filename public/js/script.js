const form = document.querySelector('form');
const searchText = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.innerHTML = 'Loading...';
    messageTwo.innerHTML = '';

    axios.get('/weather', {
        params: {
            address: searchText.value
        }
    })
        .then(({ data: { forecast: { main, weather }, address } }) => {
            const { temp, feels_like, humidity } = main;
            const description = weather[0].description;
            searchText.value = '';
            messageOne.innerHTML = address;
            messageTwo.innerHTML = `<h2>${description.toUpperCase()}</h2>`;
            messageThree.innerHTML = `Currently the temperature is <b>${temp} deg celsius</b> and feels like <b>${feels_like} deg celsius</b> and <b>${humidity}%</b> humidity.`;
        })
        .catch(error => messageOne.innerHTML = error);

});