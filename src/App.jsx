import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Vision from "./pages/Vision";
import Control from "./pages/Control";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>

      <div className="app-shell">

        <Navbar />

        <main className="main-container">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/vision"
              element={<Vision />}
            />

            <Route
              path="/control"
              element={<Control />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
};

export default App;