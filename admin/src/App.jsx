import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    );
  }

  return (
    <div className="admin-app">
      <Navbar setIsLoggedIn={setIsLoggedIn} />

      <div className="admin-layout">
        <Sidebar />

        <main className="admin-main">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/add" />}
            />

            <Route
              path="/add"
              element={<Add />}
            />

            <Route
              path="/list"
              element={<List />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="*"
              element={<Navigate to="/add" />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;