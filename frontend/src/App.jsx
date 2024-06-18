import { ServiceProvider } from "../contexts/ServiceContext";
import Home from "./pages/Home.jsx";
import Publier from "@pages/Publier/Publier.jsx";
import CreatePost from "@components/CreatePost/CreatePost";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <>
      <ServiceProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {/* <Header/> */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/publier" element={<Publier/>} />
              </Routes>
              <CreatePost />
            </main>
            {/* <Footer /> */}
          </div>
        </Router>
      </ServiceProvider>
    </>
  );
}

export default App;