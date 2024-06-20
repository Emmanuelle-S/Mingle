// import {Header} from
// import {Footer} from

import Connexion from "@components/ConnexionInscritpion/Connexion";
import Inscription from "@components/ConnexionInscritpion/Inscription";
import "../../App.css";

export default function ConnexionInscritpion() {
  return (
    // <Header />
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl flex bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="w-1/2 m-8">
          <Connexion />
        </div>
        <div className="w-1/2 m-8">
          <Inscription />
        </div>
      </div>
    </div>
    // <Footer />
  );
}
