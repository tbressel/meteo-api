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
const uvStates = [
    {state: "Faible", advice: "Faible pour le reste de la journée."},
    {state: "Faible", advice: "Faible pour le reste de la journée."},
    {state: "Faible", advice: "Faible pour le reste de la journée."},
    {state: "Modéré", advice: "Utilisez un écran solaire jusqu'à 17h00."},
    {state: "Modéré", advice: "Utilisez un écran solaire jusqu'à 17h00."},
    {state: "Elevé", advice: "Utilisez un écran solaire jusqu'à 18h00."},
    {state: "Elevé", advice: "Utilisez un écran solaire jusqu'à 18h00."},
    {state: "Très élevé", advice: "Utilisez un écran solaire jusqu'à 18h00."},
    {state: "Très élevé", advice: "Utilisez un écran solaire jusqu'à 18h00."},
     {state: "Très élevé", advice: "Utilisez un écran solaire jusqu'à 17h00."}
    ] 


// console.log('Tableau pour le fond ',background)
// console.log('heur locale actuelle',hour,'h')

if (hour >= 23 || hour <= 4) {
    document.querySelector("body").className = "night";
} else if (hour >= 18 || hour <= 22) {
    document.querySelector("body").className = "dark_clouds";
} else if (hour >= 5 || hour <= 17) {
    document.querySelector("body").className = "light_clouds";
}

createFavoritesList();
// get user favorites from the local storage
localStorage.setItem("favorites", JSON.stringify(favorites));



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

// ------------------------------------------------------------------------
// Uncomment this to check API connexion by their own service of IP catching
// Other alternative : using the auto IP of the API
// coords =  getLocalisationCitybyCoords (IPLocationMethod,apiKey);
// ------------------------------------------------------------------------

// Another methode with an external API service
// getClientIp()
//   .then(coords => {
//     // fist display of meteo location 
//     getWeatherInformations(defaultMethod, coords, apiKey, defaultLanguage, forcastDays)
//     .then(data => {
//     // if all is ok just copy data into global weather
//     weather = data;
// })
//   })
//   .catch(error => {
//     console.error('çà ne fonctionne pas', error);
//   });

// fist display of meteo location 
getWeatherInformations(defaultMethod, coords, apiKey, defaultLanguage, forcastDays).then(data => {
    // if all is ok just copy data into global weather
    weather = data;
})


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



// Listening on the input field and catch user value entries to send API search autocomplet
document.getElementById("search-input").addEventListener('input', (event) => {

    // delete previous option tag in DOM
     document.getElementById('city-list').innerHTML = "";
    let autocompletList = [];

    // each enter in search fiald go into searchText
    let searchText = event.target.value;
    
    // send the contain of searchText
    // fetch the URL and create de Local Storage
    getCityCountryList(searchMethod, searchText, apiKey);


    // get back the list from local storage and return an array
    autocompletList = getList()
    // console.log("Tableau de la liste des choix possible ",autocompletList);

    // show autocomplet list array in DOM option tag 
    displayListInField(autocompletList);
})

