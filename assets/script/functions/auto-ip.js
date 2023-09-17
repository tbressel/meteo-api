// Déclarer la fonction getClientIp en tant que fonction asynchrone
async function getClientIp() {
  try {
    const response = await fetch('http://ip-api.com/json/');
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    const data = await response.json();
    console.log('Adresse IP :', data.city);
    return data.city;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'adresse IP :', error);
    return null; // Vous pouvez renvoyer null ou une valeur par défaut en cas d'erreur
  }
}

// Appeler la fonction getClientIp et utiliser son résultat
getClientIp()
  .then(coords => {
    // Faites ce que vous voulez avec les coordonnées ici
    console.log('Coordonnées récupérées :', coords);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
