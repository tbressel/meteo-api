// API Connexion
async function fetchWeatherDatas(storageName, url) {
    // try to connect
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Stock in local storage
        localStorage.setItem(storageName, JSON.stringify(data));
        return data
    }
    // if not, let show a client message
    catch (error) {
        alert('Impossible de récupérer les données : ' + error);
    }
}


// Get json data from api
async function getWeatherInformations (method, town, apikey, lang, forecastday) {
    const urlApi = `http://api.weatherapi.com/v1${method}?q=${town}&aqi=yes&key=${apikey}&lang=${lang}&days=${forecastday}`;

    // execution of async function
    await fetchWeatherDatas("Json",urlApi);

    // get my Json from local storage
    weather = JSON.parse(localStorage.getItem("Json"));

    // Display current weather with default location
    displayCurrentWeather(weather);

    // get forecast hour by hour
    let forecastHour = getForecastHourByHour(weather);

    // display forecast hour by hour
    displayForecastHourByHour(forecastHour);
    
    // get forecast day by day
    let forecastDay =  getForecastDayByDay(weather)
    
    // display forecast day by day
      displayForecastDayByDay(forecastDay)

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
        getWeatherInformations (defaultMethod,`${inputElement.value}`, apiKey, defaultLanguage,forcastDays);
    });
}

// Get forecast infomations hour by hour
function getForecastHourByHour (array) {
    return array.forecast.forecastday[0].hour;
    }
// Get forecast infomations day by day
function getForecastDayByDay(array) {
    let arrayDayByDay = [];
    array.forecast.forecastday.forEach(element => {
        const date = element.date;
        const maxTemp = element.day.maxtemp_c;
        const minTemp = element.day.mintemp_c;
        const uv = element.day.uv;
        const condition = element.day.condition.icon;
        const humidity = element.day.avghumidity;


        // Get the whole date en english format
        let fullDateEn = new Date(date);

        // get the french name fo the weekday
        var weekdayFr = fullDateEn.toLocaleDateString('fr-FR', { weekday: 'long' });

        // push informations into a new array returned by the function
        arrayDayByDay.push(
            { weekdayFr, condition, humidity, minTemp, uv, maxTemp }
        )
    });
    return arrayDayByDay;
}

// function to get IP from actual location usin ip.json method
// async function getLocalisationCitybyIP (method, apikey) {
//     const urlApi = `http://api.weatherapi.com/v1${method}?key=${apikey}&q=auto:ip`;

//     // execution of async function
//     await fetchWeatherDatas("IP", urlApi);

//     // get my Json from local storage
//     ipLocation = JSON.parse(localStorage.getItem("IP"));
//     console.log(ipLocation)

//     return ipLocation.city;
// }


// function to get IP from actual location usin ip.json method
async function getLocalisationCitybyCoords (method, apikey) {
    const urlApi = `http://api.weatherapi.com/v1${method}?key=${apikey}&q=auto:ip`;

    // execution of async function
    await fetchWeatherDatas("IP", urlApi);

    // get my Json from local storage
    ipLocation = JSON.parse(localStorage.getItem("IP"));
    console.log(ipLocation)

    return ipLocation.city;
}

// -----------------------------------
// ------  IP coté FAI ------------
// -----------------------------------
// async function getClientIp() {
//     await fetch('http://ip-api.com/json/')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Adresse IP :', data);
//       })
//       .catch(error => {
//         console.error('Erreur lors de la récupération de l\'adresse IP :', error);
//       });
//   }
//   getClientIp();



  



  