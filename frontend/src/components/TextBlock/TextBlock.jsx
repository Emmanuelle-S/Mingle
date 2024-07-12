// Importation du hook useState de React
import { useState } from 'react';

// Définition du composant TextBlock
export default function TextBlock({ title, content }) {
    // Déclaration d'un état local pour contrôler l'affichage du contenu complet
    const [showFullContent, setShowFullContent] = useState(false);

    // Fonction pour afficher tout le contenu
    const handleReadMore = () => {
        setShowFullContent(true);
    };

    // Fonction pour afficher le contenu tronqué
    const handleReadLess = () => {
        setShowFullContent(false); // Correction: setShowFullContent(false) au lieu de true
    };
    
    // Tronquer le contenu si sa longueur dépasse 120 caractères
    const truncatedContent = content.length > 140 ? content.substring(0, 140) + '...' : content;

    return (
        <section className='py-2'>
            {/* Affichage du titre */}
            <h2 className='font-semibold py-1'>{title}</h2>

            {/* Affichage du contenu */}
            <article className='leading-7 p-2 rounded-md bg-gradient-to-r from-primary via-purple-secondary to-light font-semibold'>
                {/* Affiche le contenu complet ou tronqué selon l'état showFullContent */}
                {showFullContent ? content : truncatedContent}

                {/* Si le contenu est plus long que 120 caractères, affiche le lien approprié */}
                {content.length > 140 && (
                    <button className="relative left-2 text-dark pointer" onClick={showFullContent ? handleReadLess : handleReadMore}>
                        {/* Affiche "Lire moins" si le contenu complet est affiché, sinon "Lire la suite" */}
                        {showFullContent ? 'Lire moins' : 'Lire la suite'}
                    </button>
                )}
            </article>
        </section>
    );
}
