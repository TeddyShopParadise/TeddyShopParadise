import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catalogo/Catalogo";
import Categoria from "../pages/Categoria/Categoria";
import Cliente from "../pages/Cliente/Cliente";
import Compania from "../pages/Compañia/Compañia";
import DetalleFactura from "../pages/DetalleFactura/DetalleFactura";
import DetallePedido from "../pages/DetallePedido/DetallePedido";
import Devoluciones from "../pages/Devoluciones/Devoluciones";
import Empleado from "../pages/Empleado/Empleado";
import Factura from "../pages/Factura/Factura";
import HistorialPrecio from "../pages/HistorialPrecio/HistorialPrecio";
import Inventario from "../pages/Inventario/Inventario";
import MetodoPago from "../pages/MetodoPago/MetodoPago";
import Movimiento from "../pages/Movimiento/Movimiento";
import Pedido from "../pages/Pedido/Pedido";
import Producto from "../pages/Producto/Producto";
import Roles from "../pages/Roles/Roles";
import Usuarios from "../pages/Usuario/Usuario";
import Vendedores from "../pages/Vendedor/Vendedor";
import Login from "../pages/login/login";

const NavbarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/categoria" element={<Categoria />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/compania" element={<Compania />} />
      <Route path="/DetalleFactura" element={<DetalleFactura />} />
      <Route path="/DetallePedido" element={<DetallePedido />} />
      <Route path="/devoluciones" element={<Devoluciones />} />
      <Route path="/empleado" element={<Empleado />} />
      <Route path="/factura" element={<Factura />} />
      <Route path="/HistorialPrecio" element={<HistorialPrecio />} />
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/MetodoPago" element={<MetodoPago />} />
      <Route path="/movimiento" element={<Movimiento />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/productos" element={<Producto />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/vendedores" element={<Vendedores />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default NavbarRoutes;
