// API Key
const apiKey = "747688c35ef841a3bba95053231109";
const defaultTown = 'Paris';
const defaultMethod = '/forecast.json';
const defaultLanguage = 'fr'


getJsonFromApi (defaultMethod,defaultTown, apiKey);

// Listening to the burger button

document.getElementById("burger-button").addEventListener('click', () => {
    document.getElementById("footer__container").classList.toggle("active")
})
