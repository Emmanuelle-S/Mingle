const insults = [
    'connard',
    'con',
    'salaud',
    'salope',
    'putain',
    'merde',
    'enculé',
    'pute',
    'bâtard',
    'crétin',
    'abruti',
    'imbécile',
    'idiot',
    'chienne',
    'connasse',
    'branleur',
    'trouduc',
    'pétasse',
    'gros con',
    'fils de pute',
    'enfoiré',
    'ordure'
]; 

function noInjuries(value) {
  // Sépare la chaîne en mots (y compris les expressions avec des espaces)
  const words = value.split(/\s+/);

  // Vérifie chaque mot et remplace les insultes par des étoiles
  const result = words.map(word => {
    // Nettoyer le mot des ponctuations éventuelles
    const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');

    // Vérifie si le mot est une insulte
    if (insults.some(insult => insult.toLowerCase() === cleanWord)) {
      // Remplace chaque caractère par une étoile
      return '*'.repeat(word.length);
    }
    return word;
  });

  // Recompose la phrase avec les mots modifiés
  return result.join(' ');
}

export { noInjuries }