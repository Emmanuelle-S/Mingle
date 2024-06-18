import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound.jsx';
import Home from './pages/Home.jsx'; // Exemple d'autre composant
import "./App.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
