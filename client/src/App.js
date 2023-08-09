import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";

function App() {
  return (
    <ContactState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route exact path="/about" Component={About} />
            </Routes>
          </div>
        </div>
      </Router>
    </ContactState>
  );
}

export default App;
