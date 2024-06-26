import React, { useState } from "react";
// rappel useState : // hook de React qui permet d'utiliser l'état local dans un composant fonctionnel.
import Connexion from "@components/ConnexionInscritpion/Connexion";
import Inscription from "@components/ConnexionInscritpion/Inscription";
import "../../App.css";;

export default function ConnexionInscription() {
  const [activeComponent, setActiveComponent] = useState("");
  // Gère l'état local d'activeComponent, qui va stocker quelle valeur sera active : soit <Connexion/> soit <Inscription/>
  // 'setActiveComponent' va mettre à jour cet état.
  

  const renderComponent = () => {
  // Fonction qui retourne le composant actif en fonction de la valeur de 'activeComponent'.
    if (activeComponent === "connexion") {
      // Si 'activeComponent' est égal à 'connexion', retourne le composant <Connexion/>.
      return <Connexion />;
    } else if (activeComponent === "inscription") {
      // si non retourne le composant <Inscription/>
      return <Inscription />;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      {/* VERSION MOBILE */}
      <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden p-4 md:hidden">
        {/* Div pour la version mobile qui est cachée sur les écrans de taille 'md' et plus grandes (md:hidden) */}
        <div className="w-full flex flex-col space-y-2 ">
        {/* Div pour contenir les boutons de Connexion et Inscription*/}
          <button
            className={`w-full py-2 px-4 rounded ${activeComponent === "connexion" ? "bg-accent text-white" : "bg-accent text-white"}`}
            onClick={() => setActiveComponent("connexion")}
          >
            Connexion
            {/* Bouton Connexion qui met à jour 'activeComponent' à 'connexion' lorsqu'il est cliqué.
            Utilisation de classes conditionnelles pour changer le style du bouton actif. */}
          </button>
          <button
            className={`w-full py-2 px-4 rounded ${activeComponent === "inscription" ? "bg-darkslategray text-white" : "bg-darkslategray text-white "}`}
            onClick={() => setActiveComponent("inscription")}
          >
            Inscription
             {/* Bouton Inscription qui met à jour 'activeComponent' à 'inscription' lorsqu'il est cliqué.
            Utilisation de classes conditionnelles pour changer le style du bouton actif. */}
          </button>
        </div>
        <div className="w-full mt-4">
          {renderComponent()}
          {/* Div pour afficher le composant actif (Connexion ou Inscription) en appelant la fonction 'renderComponent' */}
        </div>
      </div>

      {/* VERSION DESKTOP */}
      <div className="hidden w-full max-w-4xl md:flex bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <Connexion />
        </div>
        <div className="w-1/2 p-8">
          <Inscription />
        </div>
      </div>
    </div>
  );
}
