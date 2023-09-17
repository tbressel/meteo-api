// Déclarer la fonction getClientIp en tant que fonction asynchrone
async function getClientIp() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) {
      throw new Error('La requête a échoué');
    }
    const data = await response.json();
    console.log('IP :', data.city);
    return data.city;
  } catch (error) {
    console.error('Erreur', error);
    return null; 
  }
}

