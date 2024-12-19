import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import MaloCheckApp from "./MaloCheckApp";
import Startseite from "./Startseite";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/">Startseite</Link>
            </li>
            <li>
              <Link to="/Marktlokations-ID">Marktlokations-ID</Link>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<Startseite />} />
            <Route path="/Marktlokations-ID" element={<MaloCheckApp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
