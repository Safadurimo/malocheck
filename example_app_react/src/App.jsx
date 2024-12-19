import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

import MaloCheckApp from "./MaloCheckApp";
import Startseite from "./Startseite";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="sidebar">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Startseite
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Marktlokations-ID"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Marktlokations-ID
              </NavLink>{" "}
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
