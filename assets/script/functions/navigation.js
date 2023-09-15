// different ways to controle burger menu
function setBurgerMenu(state) {
    const burgerElement = document.getElementById("footer__container").classList;
    state === undefined ? burgerElement.toggle("active") : null;
    state ? burgerElement.add("active") : burgerElement.remove("active");
}

// scroll back to the top window
function getScrollToTheTop() {
    window.scrollTo({top:0, behavior: "smooth"})
}



