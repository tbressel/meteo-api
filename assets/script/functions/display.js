// Display information in header
function displayCurrentWeather(jsondatas) {
    const cityName = jsondatas.location.name;
    const countryName = jsondatas.location.country;
    document.getElementById("town").firstElementChild.textContent = `${cityName}`;
    document.getElementById("town").lastElementChild.textContent = `(${countryName})`;


    
    const currentTemp = jsondatas.current.temp_c;
    document.getElementById("temp").lastElementChild.textContent = `${currentTemp}°C`;
    
    const condition = jsondatas.current.condition.text;
    document.getElementById("condition").lastElementChild.textContent = condition;
    
    const wind = jsondatas.current.wind_kph;
    document.getElementById("wind").firstElementChild.textContent = `${wind} km/h`;
    
    const humidity = jsondatas.current.humidity;
    document.getElementById("humidity").lastElementChild.textContent = `${humidity} %`;
}
// Display forecaste hour by hour
function displayForecastHourByHour (array) {
    const hourByHourNode = document.getElementById('hour-by-hour-list');
    hourByHourNode.innerHTML = "";

    console.log('Tableau des prévision heure par heure : ', array);
   
    // create an array which contains only hours and get index
    const index = getIndexWhereSameHours(array)
    // console.log(index)

    for (let i = index; i < array.length ; i++) {
        const h = array[i];
        const templateNode = document.getElementById("hour-li-template");
        const templateClone = document.importNode(templateNode.content, true);
        const hourFormat = h.time.split(' ');
        templateClone.querySelector('.hour').textContent =hourFormat[1];
        templateClone.querySelector('.image-weather').setAttribute("src",`https://${h.condition.icon}`);
        templateClone.querySelector('.temp').textContent = h.temp_c+`°C`;
    hourByHourNode.appendChild(templateClone)
}
}
// Display forecaste day by day
function displayForecastDayByDay(days) {

    const dayByDayNode = document.getElementById('day-by-day-list');
    const templateNode = document.getElementById("day-li-template");
    dayByDayNode.innerHTML = "";

    console.log ('Tableau des prévision sur 14 jours : ',days)

    for (const day of days) {
        const templateClone = document.importNode(templateNode.content, true);
        templateClone.querySelector(".day").textContent = day.weekdayFr;
        templateClone.querySelector(".image-weather").setAttribute("src", `https://${day.condition}`);
        templateClone.querySelector('.humidity').textContent = `${day.humidity}%`;
        templateClone.querySelector(".mintemp").textContent = `${day.minTemp}°C`;
        templateClone.querySelector(".uv meter").setAttribute("value", day.uv);
        templateClone.querySelector(".maxtemp").textContent = `${day.maxTemp}°C`;
        dayByDayNode.append(templateClone);
    }
}

// // Display actual weather by IP
// function displayLocalWeatherByIP (Location) {
//     getWeatherInformations(defaultMethod, Location, apiKey, defaultLanguage, forcastDays).then(data => {
//             // if all is ok just copy data into global weather
//             weather = data;

//             console.log('Temps actuel selon la localisation IP', weather)
//         })
// }

