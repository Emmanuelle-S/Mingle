import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import Home from '../../pages/Home/Home';
import Profil from '../../pages/Profil/Profil';
import Publier from "../../pages/Publier/Publier.jsx";
import NotFound from "../../pages/NotFound/NotFound.jsx";
import Formulaire from "../../components/Formulaire/Formulaire.jsx";
import FAQ from "../../pages/FAQ/FAQ";
import ConnexionInscription from "../../pages/ConnexionInscription/ConnexionInscription";
import ConditionsUtilisation from "../../pages/ConditionsUtilisation/ConditionsUtilisation";
import PolitiqueDeConfidentialité from "../../pages/PolitiqueDeConfidentialité/PolitiqueDeConfidentialité";
import EditProfil from "../../components/Profil/EditProfil";
import About from "../../pages/About/About.jsx";
import Dashboard from '../../pages/Dashboardservice/Dashboardservice';
import Service from "../../pages/Service/Service.jsx"
import Logout from '../../components/Logout/Logout';
import CardList from '../../components/Listedescategorie/CardList';
import CardDetail from '../../components/DetailsDeService/CardDetails';

function AnimatedRoutes() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5 }
  };

  return (
    <main className="flex-grow container mx-auto">

    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path="*"
          element={
            <m.div {...pageTransition}>
              <NotFound />
            </m.div>
          }
        />
        <Route
          path="/"
          element={
            <m.div {...pageTransition}>
              <Home />
            </m.div>
          }
        />
        <Route
          path="/Profil/:userId"
          element={
            <m.div {...pageTransition}>
              <Profil />
            </m.div>
          }
        />
        <Route
          path="/EditProfil"
          element={
            <m.div {...pageTransition}>
              <EditProfil />
            </m.div>
          }
        />
        <Route
          path="/formulaire"
          element={
            <m.div {...pageTransition}>
              <Formulaire />
            </m.div>
          }
        />
        <Route
          path="/publier"
          element={
            <m.div {...pageTransition}>
              <Publier />
            </m.div>
          }
        />
        <Route
          path="/ConnexionInscription"
          element={
            <m.div {...pageTransition}>
              <ConnexionInscription />
            </m.div>
          }
        />
        <Route
          path="/FAQ"
          element={
            <m.div {...pageTransition}>
              <FAQ />
            </m.div>
          }
        />
        <Route
          path="/ConditionsUtilisation"
          element={
            <m.div {...pageTransition}>
              <ConditionsUtilisation />
            </m.div>
          }
        />
        <Route
          path="/politique"
          element={
            <m.div {...pageTransition}>
              <PolitiqueDeConfidentialité />
            </m.div>
          }
        />
        <Route
          path="/about"
          element={
            <m.div {...pageTransition}>
              <About />
            </m.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <m.div {...pageTransition}>
              <Dashboard />
            </m.div>
          }
        />
        <Route
          path="/service"
          element={
            <m.div {...pageTransition}>
              <Service />
            </m.div>
          }
        />
        <Route
          path="/Logout"
          element={
            <m.div {...pageTransition}>
              <Logout />
            </m.div>
          }
        />
        <Route
          path="/listeService"
          element={
            <m.div {...pageTransition}>
              <CardList />
            </m.div>
          }
        />
       <Route
          path="/cardDetail"
          element={
            <m.div {...pageTransition}>
              <CardDetail />
            </m.div>
          }
          />
      </Routes>
    </AnimatePresence>
    </main>
  );
}

export default AnimatedRoutes;
