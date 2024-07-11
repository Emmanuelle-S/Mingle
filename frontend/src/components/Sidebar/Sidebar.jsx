import React, { useState } from 'react';

const Sidebar = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="w-64 bg-yellow-200 p-4">
      <h2 className="font-bold mb-4">Categories</h2>
      <ul className="mb-4">
        <li className="mb-2">Categorie 1</li>
        <li className="mb-2">Categorie 2</li>
        <li className="mb-2">Categorie 3</li>
        <li className="mb-2">Categorie 4</li>
        <li className="mb-2">Categorie 5</li>
      </ul>
      <div className="mt-4">
        <input type="text" placeholder="Rechercher" className="mb-4 p-2 w-full border border-gray-300 rounded" />
        
        <label className="block mb-2">
          <span className="text-gray-700">Marque</span>
          <select className="form-select mt-1 block w-full border border-gray-300 rounded">
            <option>Acer</option>
            <option>Asus</option>
            <option>Dell</option>
            <option>HP</option>
            <option>Lenovo</option>
          </select>
        </label>
        
        <div className="mb-4">
          <span className="text-gray-700">Prix</span>
          <input type="range" min="0" max="3000" className="w-full" />
        </div>
        
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">En stock</span>
          </label>
        </div>
        
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Promo</span>
          </label>
        </div>
        
        <button 
          className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
          onClick={toggleFilters}
        >
          + Filters
        </button>

        {showFilters && (
          <div className="mt-4">
            <label className="block mb-2">
              <span className="text-gray-700">Couleur</span>
              <select className="form-select mt-1 block w-full border border-gray-300 rounded">
                <option>Rouge</option>
                <option>Bleu</option>
                <option>Vert</option>
                <option>Noir</option>
                <option>Blanc</option>
              </select>
            </label>
            
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Nouveau</span>
              </label>
            </div>
            
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Utilisé</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
