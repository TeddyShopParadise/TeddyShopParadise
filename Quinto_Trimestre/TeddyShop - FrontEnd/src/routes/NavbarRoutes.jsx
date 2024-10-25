import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

const NavbarRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    );
  };

  export default NavbarRoutes;