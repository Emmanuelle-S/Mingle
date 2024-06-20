import React, { useState } from "react";
import Connexion from "@components/ConnexionInscritpion/Connexion";
import Inscription from "@components/ConnexionInscritpion/Inscription";
import "../../App.css";;

export default function ConnexionInscription() {
  const [activeComponent, setActiveComponent] = useState("");

  const renderComponent = () => {
    if (activeComponent === "connexion") {
      return <Connexion />;
    } else if (activeComponent === "inscription") {
      return <Inscription />;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      {/* VERSION MOBILE */}
      <div className="w-full max-w-4xl shadow-xl rounded-lg overflow-hidden p-4 md:hidden">
        <div className="w-full flex flex-col space-y-2">
          <button
            className={`w-full py-2 px-4 rounded ${activeComponent === "connexion" ? "bg-accent text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveComponent("connexion")}
          >
            Connexion
          </button>
          <button
            className={`w-full py-2 px-4 rounded ${activeComponent === "inscription" ? "bg-darkslategray text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveComponent("inscription")}
          >
            Inscription
          </button>
        </div>
        <div className="w-full mt-4">
          {renderComponent()}
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
