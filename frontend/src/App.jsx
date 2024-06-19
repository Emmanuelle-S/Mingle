import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";
import Formulaire from './components/Formulaire/Formulaire.jsx'

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* <Header/> */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/formulaire" element={<Formulaire/>} />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </>
  );
}

export default App;