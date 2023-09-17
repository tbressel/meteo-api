
document.getElementById("favorite-star").addEventListener('click', () =>{

    // getting actual search weather from local Storage
    let weather = JSON.parse(localStorage.getItem("Json"))
    console.log(weather)
    let location = getLocation(weather)
    addFavorites(location);   
})



// get city name and counrty from API request
function getLocation(weather) {
    return `${weather.location.name}, ${weather.location.country}`;
}


// Adding favorites to the list
function addFavorites(location) {

    if (location !== undefined) {
        // transform location string format to an array
        const splitLocation = location.split(', ');
        
        // construction of same pase object got by the API
        const objectLocation = { name: splitLocation[0], country: splitLocation[1] };

        // if it contains the same object, return true 
        const isFavorite = favorites.some((favorite) => {
            return favorite.name === objectLocation.name && favorite.country === objectLocation.country;
        });

        // Happening if isFavorite is true or false 
        if (isFavorite) {
            // if true removing the same location found
            removeFavorite(objectLocation)

            // create a new list
            createFavoritesList();

        } else {
            // if false, adding it into the array
            favorites.push(objectLocation);

            // creat a new list
            createFavoritesList();

            // set the star yellow or black
            isFavoriteLocation(location);
        }
         // stock the new list in local storage
         localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
        favorites = getFavorites();

        // creat a new list
        createFavoritesList();
    }
}


// get favorites from local storage
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites"));
}
let favorites = getFavorites();





// display favorites list
function createFavoritesList() {

    // Delete previous content
    const cibleElement = document.getElementById("favorite__list");
    cibleElement.innerHTML = "";
    if (favorites === null) {
         favorites = []; 
    }
    favorites.forEach(favorite => {
        const cloneElement = document.importNode(document.getElementById("favorite-template").content, true);
        cloneElement.getElementById("favorite-city-country").textContent = `${favorite.name}, ${favorite.country}`;
        cibleElement.appendChild(cloneElement);
    });
}



// check if current location is a favorite location
function isFavoriteLocation(location) {

    // if array favoris is empty then initialize favorites
    const favoriteStarElement = document.querySelector("#favorite-star img");
    if (favorites.length === 0 ) {
        favorites = []; 
   }

   // get name and counrty from the array
   for(const favorite of favorites) {
       let favoriteString = `${favorite.name}, ${favorite.country}`;
       if(location === favoriteString) {
        // turing star into yellow and exit 
           favoriteStarElement.setAttribute("src","./assets/medias/svg/star-solid.svg");
           return;
       } else {
        // turning star into black one.
        favoriteStarElement.setAttribute("src","./assets/medias/svg/star-regular.svg");
       }
   }
    ;
}

// removing a favorite by cliking the star
function removeFavorite(object) {
    favorites = favorites.filter((favorite) => {
        return favorite.name !== object.name || favorite.country !== object.country;
    });
    document.querySelector("#favorite-star img").setAttribute("src","./assets/medias/svg/star-regular.svg");
}

// show location into DOM
function displayLocation(location) {
    // document.querySelector(".title-name-country").textContent = location;

    // testing if current location already in favorites
    isFavoriteLocation(location);
}



// Listener on each favorite to get weather
document.getElementById("favorite__list").addEventListener('click', (event) => {
    const targetNode = event.target.className;
    if(targetNode !== "text-city-country") {
        return;
    } else {
        const newRequestLocation = event.target.textContent;
        getWeatherInformations(defaultMethod, newRequestLocation, apiKey, defaultLanguage, forcastDays);
                // close burger menu
                setBurgerMenu(false);

                // scroll to the top of the window
                getScrollToTheTop();
    
    
    
    
    }
})