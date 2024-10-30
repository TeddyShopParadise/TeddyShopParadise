import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import normalizeText from '../../utils/textUtils';
import { Link } from 'react-router-dom';
import LinkBehavior from './LinkBehavior';
import logoTeddyShop from '../../assets/img/LogoTeddyShop.jpg';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElRoles, setAnchorElRoles] = useState(null);
  const [anchorElUsuarios, setAnchorElUsuarios] = useState(null);
  const [anchorElPedidos, setAnchorElPedidos] = useState(null);
  const [anchorElProductos, setAnchorElProductos] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleRolesMenuOpen = (event) => {
    setAnchorElRoles(event.currentTarget);
  };

  const handleRolesMenuClose = () => {
    setAnchorElRoles(null);
  };

  const handleUsuariosMenuOpen = (event) => {
    setAnchorElUsuarios(event.currentTarget);
  };

  const handleUsuariosMenuClose = () => {
    setAnchorElUsuarios(null);
  };

  const handlePedidosMenuOpen = (event) => {
    setAnchorElPedidos(event.currentTarget);
  };

  const handlePedidosMenuClose = () => {
    setAnchorElPedidos(null);
  };

  const handleProductosMenuOpen = (event) => {
    setAnchorElProductos(event.currentTarget);
  };

  const handleProductosMenuClose = () => {
    setAnchorElProductos(null);
  };

  const drawer = (
    <div>
      <List>
        {['Realizar Reporte', 'Agregar Producto', 'Modificar Producto', 'Registrar Usuario', 'Proveedores', 'Clientes'].map((text) => (
          <ListItem button component={LinkBehavior} to={`/${normalizeText(text)}`} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        style={{
          background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
          backdropFilter: "blur(8px)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          backgroundSize: "200% 200%",
          animation: "shimmer 2s infinite linear"
        }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: '#2F2F2F' }}>
            <Button
              component={LinkBehavior}
              to="/Home"
              size="large"
              color="inherit"
            >
              <img src={logoTeddyShop} alt="TeddyShop Logo" style={{ height: '65px' }} />
              <Typography variant="h4">TeddyShop</Typography>
            </Button>
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* Menús desplegables para pantallas grandes */}
            <Button
              color="inherit"
              onClick={handleRolesMenuOpen}
              style={{ color: '#2F2F2F', fontSize: '20px' }}
            >
              Administrador de Roles
            </Button>
            <Menu
              anchorEl={anchorElRoles}
              open={Boolean(anchorElRoles)}
              onClose={handleRolesMenuClose}
            >
              <MenuItem component={LinkBehavior} to="/roles">Administrar roles</MenuItem>
            </Menu>

            <Button
              color="inherit"
              onClick={handleUsuariosMenuOpen}
              style={{ color: '#2F2F2F', fontSize: '20px' }}
            >
              Administrador de Usuarios
            </Button>
            <Menu
              anchorEl={anchorElUsuarios}
              open={Boolean(anchorElUsuarios)}
              onClose={handleUsuariosMenuClose}
            >
              <MenuItem component={LinkBehavior} to="/vendedores">Vendedores</MenuItem>
              <MenuItem component={LinkBehavior} to="/empleado">Empleados</MenuItem>
              <MenuItem component={LinkBehavior} to="/cliente">Clientes</MenuItem>
            </Menu>

            <Button
              color="inherit"
              onClick={handlePedidosMenuOpen}
              style={{ color: '#2F2F2F', fontSize: '20px' }}
            >
              Administrador de Pedidos
            </Button>
            <Menu
              anchorEl={anchorElPedidos}
              open={Boolean(anchorElPedidos)}
              onClose={handlePedidosMenuClose}
            >
              <MenuItem component={LinkBehavior} to="/pedido">Pedidos</MenuItem>
              <MenuItem component={LinkBehavior} to="/factura">Facturas</MenuItem>
              <MenuItem component={LinkBehavior} to="/DetalleFactura">Detalle de la Factura</MenuItem>
              <MenuItem component={LinkBehavior} to="/DetallePedido">Detalle del Pedido</MenuItem>
              <MenuItem component={LinkBehavior} to="/devoluciones">Devoluciones</MenuItem>
            </Menu>

            <Button
              color="inherit"
              onClick={handleProductosMenuOpen}
              style={{ color: '#2F2F2F', fontSize: '20px' }}
            >
              Administrador de Productos
            </Button>
            <Menu
              anchorEl={anchorElProductos}
              open={Boolean(anchorElProductos)}
              onClose={handleProductosMenuClose}
            >
              <MenuItem component={LinkBehavior} to="/HistorialPrecio">Historial del Precio</MenuItem>
              <MenuItem component={LinkBehavior} to="/inventario">Inventario</MenuItem>
              <MenuItem component={LinkBehavior} to="/MetodoPago">Método de Pago</MenuItem>
              <MenuItem component={LinkBehavior} to="/movimiento">Movimientos</MenuItem>
            </Menu>

            <Button
              color="inherit"
              component={LinkBehavior}
              to="/productos"
              style={{ color: '#2F2F2F', fontSize: '20px' }}
            >
              Ver Productos
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}
