import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Catalogo from "../pages/Catalogo/Catalogo";
import Categoria from "../pages/Categoria/Categoria";
import Cliente from "../pages/Cliente/Cliente";
import Compañia from "../pages/Compañia/Compañia";
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
import Usuario from "../pages/Usuario/Usuario";
import Vendedor from "../pages/Vendedor/Vendedor";

const NavbarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/categoria" element={<Categoria />} />
      <Route path="/clientes" element={<Cliente />} />
      <Route path="/compañia" element={<Compañia />} />
      <Route path="/detalle-factura" element={<DetalleFactura />} />
      <Route path="/detalle-pedido" element={<DetallePedido />} />
      <Route path="/devoluciones" element={<Devoluciones />} />
      <Route path="/empleados" element={<Empleado />} />
      <Route path="/facturas" element={<Factura />} />
      <Route path="/historial-precio" element={<HistorialPrecio />} />
      <Route path="/inventarios" element={<Inventario />} />
      <Route path="/metodo-pago" element={<MetodoPago />} />
      <Route path="/movimientos" element={<Movimiento />} />
      <Route path="/pedidos" element={<Pedido />} />
      <Route path="/productos" element={<Producto />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/usuarios" element={<Usuario />} />
      <Route path="/vendedores" element={<Vendedor />} />
    </Routes>
  );
};

export default NavbarRoutes;
