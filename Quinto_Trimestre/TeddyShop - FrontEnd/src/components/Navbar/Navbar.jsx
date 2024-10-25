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

  const handleMenuOpen = (setAnchorEl, event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (setAnchorEl) => {
    setAnchorEl(null);
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
      <AppBar position="fixed" style={{ backgroundColor: '#FFB6C1' }}>
        <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, color: '#2F2F2F'}}>
                <Button
                    component={LinkBehavior}
                    to="/Home"
                    size="large"
                    color="inherit"
                >
                <img src={logoTeddyShop} alt="TeddyShop Logo" style={{ height: '50px' }} />
                <Typography variant="h5">TeddyShop</Typography>
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
                {/* Administrador de Roles */}
                <Button
                    color="inherit"
                    onClick={(e) => handleMenuOpen(setAnchorElRoles, e)}
                    style={{ color: '#2F2F2F' }} 
                >
                    Administrador de Roles
                </Button>
                <Menu
                    anchorEl={anchorElRoles}
                    open={Boolean(anchorElRoles)}
                    onClose={() => handleMenuClose(setAnchorElRoles)}
                >
                    <MenuItem component={LinkBehavior} to="/roles">Administrar roles</MenuItem>
                    <MenuItem component={LinkBehavior} to="/user-roles">Administrar roles de usuario</MenuItem>
                </Menu>

                {/* Administrador de Usuarios */}
                <Button
                    color="inherit"
                    onClick={(e) => handleMenuOpen(setAnchorElUsuarios, e)}
                    style={{ color: '#2F2F2F' }} 
                >
                    Administrador de Usuarios
                </Button>
                <Menu
                    anchorEl={anchorElUsuarios}
                    open={Boolean(anchorElUsuarios)}
                    onClose={() => handleMenuClose(setAnchorElUsuarios)}
                >
                    <MenuItem component={LinkBehavior} to="/vendedores">Vendedores</MenuItem>
                    <MenuItem component={LinkBehavior} to="/empleados">Empleados</MenuItem>
                    <MenuItem component={LinkBehavior} to="/clientes">Clientes</MenuItem>
                </Menu>

                {/* Administrador de Pedidos */}
                <Button
                    color="inherit"
                    onClick={(e) => handleMenuOpen(setAnchorElPedidos, e)}
                    style={{ color: '#2F2F2F' }} 
                >
                    Administrador de Pedidos
                </Button>
                <Menu
                    anchorEl={anchorElPedidos}
                    open={Boolean(anchorElPedidos)}
                    onClose={() => handleMenuClose(setAnchorElPedidos)}
                >
                    <MenuItem component={LinkBehavior} to="/pedidos">Pedidos</MenuItem>
                    <MenuItem component={LinkBehavior} to="/facturas">Facturas</MenuItem>
                    <MenuItem component={LinkBehavior} to="/detalle-factura">Detalle de la Factura</MenuItem>
                    <MenuItem component={LinkBehavior} to="/detalle-pedido">Detalle del Pedido</MenuItem>
                    <MenuItem component={LinkBehavior} to="/devoluciones">Devoluciones</MenuItem>
                </Menu>

                {/* Administrador de Productos */}
                <Button
                    color="inherit"
                    onClick={(e) => handleMenuOpen(setAnchorElProductos, e)}
                    style={{ color: '#2F2F2F' }} 
                >
                    Administrador de Productos
                </Button>
                <Menu
                    anchorEl={anchorElProductos}
                    open={Boolean(anchorElProductos)}
                    onClose={() => handleMenuClose(setAnchorElProductos)}
                >
                    <MenuItem component={LinkBehavior} to="/historial-precio">Historial del Precio</MenuItem>
                    <MenuItem component={LinkBehavior} to="/inventarios">Inventario</MenuItem>
                    <MenuItem component={LinkBehavior} to="/metodo-pago">Método de Pago</MenuItem>
                    <MenuItem component={LinkBehavior} to="/movimientos">Movimientos</MenuItem>
                </Menu>

                {/* Ver Productos */}
                <Button
                    color="inherit"
                    component={LinkBehavior}
                    to="/productos"
                    style={{ color: '#2F2F2F' }} 
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
