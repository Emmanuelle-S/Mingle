import React from 'react';
import { format, parseISO } from 'date-fns';

const DateTimeDisplay = ({ isoDate }) => {
  // Convertir la date ISO en un objet Date
  const date = parseISO(isoDate);

  // Formater la date
  const formattedDate = format(date, 'dd/MM/yy HH:mm:ss');

  return (
    <div className='text-gray-500 text-[10px]'>
      <p className='ml-2 whitespace-no-wrap'>{formattedDate}</p>
    </div>
  );
};

// Utilisation dans un autre composant ou fichier
const App = () => {
  const isoDateFromDB = "2024-07-04T15:21:38.000Z";

  return (
    <div>
      <DateTimeDisplay isoDate={isoDateFromDB} />
    </div>
  );
};

export default App;

