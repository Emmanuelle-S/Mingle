import { useState } from 'react';
import axios from 'axios'; // Assurez-vous d'installer axios

function SearchComponent({users, setFriends}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    // Fonction de gestion de la saisie
    const handleInputChange = async (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        // Envoi de la requête de recherche au serveur
        if (term.length > 2) { // Exemple: déclencher la recherche après 2 caractères
            try {
                const filtered = users.filter(user => user.username.toLowerCase().includes(term))
                setResults(filtered);
            } catch (error) {
                console.error('Erreur de recherche:', error);
            }
        } else {
            setResults([]); // Réinitialiser les résultats si la saisie est courte
        }
    };

    const AddFriend = async (result) => {
        const newFriend = result.id;
        // const response = await axios.put(http://localhost:5000/friends/${})
    };

    return (
        <div className="relative">
            <label>
                <input
                    className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <path
                            fill="#bbb"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                        />
                    </svg>
                </span>
            </label>
            <div>
                {results.length > 0 && (
                    <ul className="list-none mt-2">
                        {results.map((result) => (
                            <div className='flex'>
                                <li key={result.id} className="p-2 border-b border-gray-700">
                                    {result.username}
                                </li>
                                <button
                                    onClick={() => {AddFriend(result)}}
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SearchComponent;
