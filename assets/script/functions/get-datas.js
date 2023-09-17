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


// Get forecast.json data from API
async function getWeatherInformations (method, town, apikey, lang, forecastday) {
    const urlApi = `http://api.weatherapi.com/v1${method}?q=${town}&aqi=yes&key=${apikey}&lang=${lang}&days=${forecastday}`;

    // execution of async function
    await fetchWeatherDatas("Json",urlApi);

    // get my Json from local storage
    weather = JSON.parse(localStorage.getItem("Json"));
    // console.log('Météo avec la méthode par defaut:', weather)

    // Display current weather with default location
    displayCurrentWeather(weather);


    // get return data from getLocation
    let nameLocation = getLocation(weather);

    // Use them to display Location
    displayLocation(nameLocation);




    // get forecast hour by hour
    let forecastHour = getForecastHourByHour(weather);

    // display forecast hour by hour
    displayForecastHourByHour(forecastHour);
    
    // get forecast day by day
    let forecastDay =  getForecastDayByDay(weather)
    
    // display forecast day by day
      displayForecastDayByDay(forecastDay)


    // get uv average informations
    const UvAverage = getUvAverage(weather)
    // console.log(UvAverage);

    // display uv average informations
    displayUvAverage(UvAverage);

    return weather;
}

// Get search.json from API
async function getCityCountryList(method, town, apikey) {
    const urlApi = `http://api.weatherapi.com/v1${method}?q=${town}&aqi=yes&key=${apikey}`;

    // execution of async function
    await fetchWeatherDatas("autocomplet", urlApi);
}





// Get city name entered by the use from the input field
function getCityName () {
    const form = document.getElementById("search-form");
    const inputElement = document.getElementById("search-input");
    form.addEventListener("submit", function(event) {

        // don't want default use of the button
        event.preventDefault();

        // close burger menu
        setBurgerMenu(false);

        // scroll to the top of the window
        getScrollToTheTop();

        // get weather information
        getWeatherInformations (defaultMethod,`${inputElement.value}`, apiKey, defaultLanguage,forcastDays);

        // cleaning the input field
        cleanInputSearchField();

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
async function getLocalisationCitybyIP (method, apikey) {
    const urlApi = `http://api.weatherapi.com/v1${method}?key=${apikey}&q=auto:ip`;
    // execution of async function
    await fetchWeatherDatas("IP", urlApi);
    // get my Json from local storage
    ipLocation = JSON.parse(localStorage.getItem("IP"));
    // console.log(ipLocation)
    return [ipLocation.city,ipLocation.country_name];
}




function getList() {
    let autocompletList = [];

    // get the local storage array
    const arrayList = JSON.parse(localStorage.getItem("autocomplet"));
    arrayList.forEach(element => {
        autocompletList.push(`${element.name}, ${element.country}`);
    })
    return autocompletList;
}


// display getList() result in option field
function displayListInField(array) {
    const optionNode = document.getElementById('city-list');

    array.forEach(element => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", element)
        optionElement.textContent = element;
        optionNode.appendChild(optionElement)
    })
}


function cleanInputSearchField() {
    document.getElementById("search-input").value="";
}

function getIndexWhereSameHours(array) {
    // new array to get only hours from array
    let newArray = [];
    const fullDate = new Date();
    
    array.forEach(object => {
        // split hours from date then split hours from minutes
        newArray.push(object.time.split(' ')[1].split(':')[0]);
    })


    let localHour = fullDate.getHours();
    localHour <= 9 ? localHour = "0"+fullDate.getHours() : localHour = fullDate.getHours();
    

    // be carefull : i (string) and localhour (number)
    for (const i of newArray) {
        if (i == localHour) {
            const index = newArray.indexOf(i);
            return index;
        }
    }
}


function getUvAverage(weather) {
    // console.log("Tableau des type d'indice", uvStates)

    const uvAverage = JSON.stringify(weather.current.uv);
    const uvState = uvStates[uvAverage].state;
    const uvAdvice = uvStates[uvAverage].advice;
    return { uvAverage, uvState, uvAdvice }
}

