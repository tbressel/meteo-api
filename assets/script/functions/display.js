// Display information in header
function displayCurrentWeather(jsondatas) {
    if(jsondatas.location.name === undefined) {
        return
    }
    // console.log(jsondatas)
    const cityName = jsondatas.location.name;

    const countryName = jsondatas.location.country;
    document.getElementById("town").firstElementChild.textContent = `${cityName}`;
    document.getElementById("town").lastElementChild.textContent = `(${countryName})`;

    const currentTemp = jsondatas.current.temp_c;
    document.getElementById("temp").lastElementChild.textContent = `${currentTemp}°C`;
    
    const condition = jsondatas.current.condition.text;
    document.getElementById("condition").lastElementChild.textContent = condition;
    
    const feel = jsondatas.current.feelslike_c;
    document.getElementById("feelslike").firstElementChild.textContent = `ressentit : ${feel} °C`;



}
// Display forecaste hour by hour
function displayForecastHourByHour (array) {
    const hourByHourNode = document.getElementById('hour-by-hour-list');
    hourByHourNode.innerHTML = "";

    // console.log('Tableau des prévision heure par heure : ', array);
   
    // create an array which contains only hours and get index
    const index = getIndexWhereSameHours(array)
    // console.log("Key du tableau qui compare l'heure local avec l'heur du tableau", index)


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

    // console.log ('Tableau des prévision sur 14 jours : ',days)

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


// display UV average
function displayUvAverage(object) {
    const templateNode = document.getElementById('uv-li-template');
    const templateClone = document.importNode(templateNode, true).content;
    // console.log(templateClone);
    const uvNode = document.getElementById('uv-average-list');
    uvNode.innerHTML="";

    templateClone.querySelector('.uv-average').textContent = object.uvAverage;
    templateClone.querySelector('.uv-state').textContent = object.uvState;
    templateClone.querySelector('.uv-description').textContent = object.uvAdvice;
    templateClone.querySelector('meter').setAttribute("value", object.uvAverage);
    uvNode.appendChild(templateClone);
}

// display sunrise and sunset hours

function displaySunriseAndSunsetHours(array) {
    document.getElementById('sun-sunset').textContent = array.astronomy.astro.sunset;
    document.getElementById('sun-sunrise').textContent = array.astronomy.astro.sunrise;
}


