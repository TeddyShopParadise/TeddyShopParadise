import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import MasInformacion from "../pages/masinformacion/MasInformacion";

const NavbarRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/masinformacion" element={<MasInformacion />} />
      </Routes>
    );
  };

  export default NavbarRoutes;