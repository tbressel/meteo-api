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
async function getJsonFromApi (method, town, apikey, lang) {
    const urlApi = `http://api.weatherapi.com/v1${method}?q=${town}&aqi=yes&key=${apikey}&lang=${lang}`;
    
    // execution of async function
    await fetchWeatherDatas(urlApi);
    
    // get my Json from local storage
    weather = JSON.parse(localStorage.getItem("Json"));

    // Display current weather with default location
    displayCurrentWeather(weather);
    
    console.table(weather);
}

// Display information in header
function displayCurrentWeather(jsondatas) {
    const cityName = jsondatas.location.name;
    document.getElementById("town").lastElementChild.textContent = cityName;
    
    const currentTemp = jsondatas.current.temp_c;
    document.getElementById("temp").lastElementChild.textContent = `${currentTemp}°`;
    
    const condition = jsondatas.current.condition.text;
    document.getElementById("condition").lastElementChild.textContent = condition;
    
    const wind = jsondatas.current.wind_kph;
    document.getElementById("wind").firstElementChild.textContent = `${wind} km/h`;
    
    const humidity = jsondatas.current.humidity;
    document.getElementById("humidity").lastElementChild.textContent = `${humidity} %`;
}


function getCityName () {
    const form = document.getElementById("search-form");
    const inputElement = document.getElementById("search-input");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        getJsonFromApi (defaultMethod,`${inputElement.value}`, apiKey, defaultLanguage);
    });
}

