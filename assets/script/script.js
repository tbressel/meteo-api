// API Key
const apiKey = "747688c35ef841a3bba95053231109";
let defaultTown = '';
const defaultMethod = '/forecast.json';
const IPLocationMethod = '/ip.json';
const searchMethod = '/search.json;'
const defaultLanguage = 'fr';
const forcastDays = 14;
let date = new Date();
let hour = date.getHours()
let weather = [];
let LocationByIp = '';
let background = {
    nuit: './medias/img/GrandeOurse.jpg',
    nuages_sombre: './medias/img/clouds2.jpg',
    nuages_clair: './medias/img/clouds.jpg',
}
console.log(background)
console.log(hour)

if (hour >= 23 || hour <= 4) {
    document.querySelector("body").className = "night";
} else if (hour >= 18 || hour <= 22) {
    document.querySelector("body").className = "dark_clouds";
} else if (hour >= 5 || hour <= 17) {
    document.querySelector("body").className = "light_clouds";
}




// Chek if geolocation is available in this browser
if ("geolocation" in navigator) {
    // Ask user if geolocation is ok
    navigator.geolocation.getCurrentPosition(async function (position) {
        // get coordonates
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coords = `${latitude}, ${longitude}`;
        // save actual GPS coords
        localStorage.setItem("coords", coords)

        if (coords === "") {
            getLocalisationCitybyIP(IPLocationMethod, apiKey).then(data => {
                // if all is ok just copy data into global weather
                LocationByIp = data;
                displayLocalWeatherByIP(LocationByIp)
            })
        }
    });
} else {
    // if not available
    reject("La géolocalisation n'est pas disponible dans ce navigateur.");
    getLocalisationCitybyIP(IPLocationMethod, apiKey).then(data => {
        // if all is ok just copy data into global weather
        LocationByIp = data;
        displayLocalWeatherByIP(LocationByIp)
    })

}


// get coords back to the local storage
coords = localStorage.getItem("coords")

// fist display of meteo location 
getWeatherInformations(defaultMethod, coords, apiKey, defaultLanguage, forcastDays).then(data => {
    // if all is ok just copy data into global weather
    weather = data;
})



//  getWeatherInformations(defaultMethod, defaultTown, apiKey, defaultLanguage, forcastDays).then(data => {
//      // if all is ok just copy data into global weather
//      weather = data;
//  })



// Listening to the burger button and toggle 
document.getElementById("burger-button").addEventListener('click', () => {
    document.getElementById("footer__container").classList.toggle("active")
})

getCityName();

// Lisening to the scrolling event
document.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    document.querySelectorAll(".header-container").forEach(element => {
        // when the offsetTop of each element <= scroll top value then set the class sticky
        // console.log(element)
        scrollTop >= element.offsetTop ? element.classList.add("sticky") : element.classList.remove("sticky");
    });
});





document.getElementById("search-input").addEventListener('input', (event) => {
    let searchText = event.target.value;
    getCityCountryList(searchMethod, searchText, apiKey);
    const autocompletList = getList()
    displayListInField(autocompletList);
})

// Get json data from api
async function getCityCountryList(method, town, apikey) {
    const urlApi = `http://api.weatherapi.com/v1${method}?q=${town}&aqi=yes&key=${apikey}`;

    // execution of async function
    await fetchWeatherDatas("autocomplet", urlApi);
}

function getList() {
    let autocompletList = [];
    const arrayList = JSON.parse(localStorage.getItem("autocomplet"));
    arrayList.forEach(element => {
        autocompletList.push(`${element.name}, ${element.country}`);
    })
    console.log(autocompletList)
    return autocompletList;
}

function displayListInField(array) {
    console.table(array)
    const optionNode = document.getElementById('city-list');
    optionNode.innerHTML = "";

    array.forEach(element => {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", element)
        optionElement.textContent = element;
        optionNode.appendChild(optionElement)
    })
}