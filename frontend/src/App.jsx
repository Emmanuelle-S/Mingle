import Home from "./pages/Home.jsx";
import Publier from "@pages/Publier/PublisPost.jsx";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="publier">{<Publier />}</Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;