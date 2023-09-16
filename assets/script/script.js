// API Key
const apiKey = "747688c35ef841a3bba95053231109";
const defaultTown = 'Paris';
const defaultMethod = '/forecast.json';
const IPLocationMethod = '/ip.json';
const defaultLanguage = 'fr';
const forcastDays = 14;
let weather = [];
let LocationByIp = '' ;

getLocalisationCitybyIP(IPLocationMethod, apiKey).then(data => {
    // if all is ok just copy data into global weather
    LocationByIp = data;
    displayLocalWeatherByIP(LocationByIp)
})
// getWeatherInformations(defaultMethod, defaultTown, apiKey, defaultLanguage).then(data => {
//     // if all is ok just copy data into global weather
//     weather = data;
// })



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
        scrollTop >= element.offsetTop ? element.classList.add("sticky") : element.classList.remove("sticky");    });
});


