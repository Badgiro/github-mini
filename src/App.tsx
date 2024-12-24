import React from "react";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import Navigation from "./components/navigation";

const App = () => {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
};

export default App;
