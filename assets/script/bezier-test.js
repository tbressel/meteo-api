function calculateQuadraticBezierPoint(t, p0, p1, p2) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;

    const p = {
        x: uu * p0.x + 2 * u * t * p1.x + tt * p2.x,
        y: uu * p0.y + 2 * u * t * p1.y + tt * p2.y
    };

    return p;
}

// Points de contrôle de la courbe de Bézier quadratique
const p0 = { x: 0, y: 50 };
const p1 = { x: 60, y: 0 };
const p2 = { x: 120, y: 50 };

// Créer un élément pour la lettre "o"
const oElement = document.getElementById("o-container");

// Vitesse de déplacement (24 divisions en 1 heure)
const speed = 1 / 24;
let t = 0;

// Élément d'information dans le DOM
// const infoElement = document.getElementById("info-container");

function animate() {
    const point = calculateQuadraticBezierPoint(t, p0, p1, p2);
    oElement.style.left = point.x + "px";
    oElement.style.top = point.y + "px";

    // Afficher uniquement la division en cours dans le DOM
    const now = new Date();
    const hour = now.getHours();

    // Calculer la division actuelle (heure)
    const division = hour;

    // infoElement.innerHTML = `Division en cours : ${division} heure(s)`;

    t += speed;

    if (t >= 1) {
        t = 0;
    }
}

// Appeler la fonction d'animation toutes les secondes
const animationInterval = setInterval(animate, 100);

// Positionner "o" initialement sur la division correspondante à l'heure actuelle
const initialCoordinate = calculateQuadraticBezierPoint(0, p0, p1, p2);
oElement.style.left = initialCoordinate.x + "px";
oElement.style.top = initialCoordinate.y + "px";

// Afficher la division en cours initiale
const initialHour = new Date().getHours();
infoElement.innerHTML = `Division en cours : ${initialHour} heure(s)`;