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

function noInjuries (value) {
    // Vérifie si la valeur est une insulte
  if (insults.includes(value.toLowerCase())) {
    // Remplace chaque caractère par une étoile
    return '*'.repeat(value.length);
  }
  return value;
}

export { noInjuries }