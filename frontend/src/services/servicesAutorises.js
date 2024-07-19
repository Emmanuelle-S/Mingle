const servicesAutorises = [
    'Aide au devoir',
    'Aide au bricolage',
    'Aide au covoiturage',
    'Aide aux repas',
    'Aide Garde d\'enfants',
    'Aide médecin à domicile'
  ];
  
  function validerServices(value) {
    // Sépare la chaîne en services (séparés par des virgules)
    const services = value.split(',').map(service => service.trim());
  
    // Vérifie chaque service et renvoie false si un service n'est pas dans la liste autorisée
    return services.every(service => servicesAutorises.includes(service));
  }
  
  export { validerServices };
  