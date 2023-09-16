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
// Display forecaste hour by hour
function displayForecastHourByHour (array) {
    const hourByHourNode = document.getElementById('hour-by-hour-list');
    for (const h of array) {
        const templateNode = document.getElementById("hour-li-template");
        const templateClone = document.importNode(templateNode.content, true);
        const hourFormat = h.time.split(' ');
        templateClone.querySelector('.hour').textContent =hourFormat[1];
        templateClone.querySelector('.image-weather').setAttribute("src",`https://${h.condition.icon}`);
        templateClone.querySelector('.temp').textContent = h.temp_c+`°`;
    hourByHourNode.appendChild(templateClone)
}
}
// Display forecaste day by day
function displayForecastDayByDay(days) {

    const dayByDayNode = document.getElementById('day-by-day-list');
    const templateNode = document.getElementById("day-li-template");
    for (const day of days) {
        const templateClone = document.importNode(templateNode.content, true);
        templateClone.querySelector(".day").textContent = day.weekdayFr;
        templateClone.querySelector(".image-weather").setAttribute("src", `https://${day.condition}`);
        templateClone.querySelector('.humidity').textContent = `${day.humidity}%`;
        templateClone.querySelector(".mintemp").textContent = `${day.minTemp}°`;
        templateClone.querySelector(".uv meter").setAttribute("value", day.uv);
        templateClone.querySelector(".maxtemp").textContent = `${day.maxTemp}°`;
        dayByDayNode.append(templateClone);
    }
}

// Display actual weather by IP
function displayLocalWeatherByIP (Location) {
    getWeatherInformations(defaultMethod, Location, apiKey, defaultLanguage, forcastDays).then(data => {
            // if all is ok just copy data into global weather
            weather = data;
        })
}

