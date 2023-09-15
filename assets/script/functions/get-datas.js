// API Connexion
async function fetchWeatherDatas(url) {
    // try to connect
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Stock in local storage
        localStorage.setItem("Json", JSON.stringify(data));
        return data
    }
    // if not, let show a client message
    catch (error) {
        alert('Impossible de récupérer les données : ' + error);
    }
}




// Get json data from api
async function getWeatherInformations (method, town, apikey, lang) {
    const urlApi = `http://api.weatherapi.com/v1${method}?q=${town}&aqi=yes&key=${apikey}&lang=${lang}`;

    // execution of async function
    await fetchWeatherDatas(urlApi);

    // get my Json from local storage
    weather = JSON.parse(localStorage.getItem("Json"));

    // Display current weather with default location
    displayCurrentWeather(weather);
    // console.table(weather);
    return weather;
}



// Get city name entered by the use from the input field
function getCityName () {
    const form = document.getElementById("search-form");
    const inputElement = document.getElementById("search-input");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        setBurgerMenu(false);
        getScrollToTheTop();
        getWeatherInformations (defaultMethod,`${inputElement.value}`, apiKey, defaultLanguage);
    });
}





