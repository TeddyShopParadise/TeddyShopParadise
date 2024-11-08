import React, { useState, useEffect } from 'react';
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
import Modal from '@mui/material/Modal';
import normalizeText from '../../utils/textUtils';
import { Link } from 'react-router-dom';
import LinkBehavior from './LinkBehavior';
import logoTeddyShop from '../../assets/img/LogoTeddyShop.jpg';
import Login from '../../pages/login/login';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElRoles, setAnchorElRoles] = useState(null);
  const [anchorElUsuarios, setAnchorElUsuarios] = useState(null);
  const [anchorElProductos, setAnchorElProductos] = useState(null);
  const [anchorElPedidos, setAnchorElPedidos] = useState(null);
  const [anchorElVerProductos, setAnchorElVerProductos] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Obtener el rol del usuario desde el token
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.roles && decodedToken.roles[0]);
    }
  }, [isAuthenticated]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const drawer = (
    <List>
      {['Realizar Reporte', 'Agregar Producto', 'Modificar Producto', 'Registrar Usuario', 'Proveedores', 'Clientes'].map((text) => (
        <ListItem button component={LinkBehavior} to={`/${normalizeText(text)}`} key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar 
        position="relative" 
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
            {/* Mostrar opciones según el rol del usuario */}
            {userRole === 'Administrador' && (
              <>
                <Button
                  color="inherit"
                  onClick={() => setAnchorElRoles(true)}
                  style={{ color: '#2F2F2F', fontSize: '20px' }}
                >
                  Administrador de Roles
                </Button>
                <Menu
                  anchorEl={anchorElRoles}
                  open={Boolean(anchorElRoles)}
                  onClose={() => setAnchorElRoles(false)}
                >
                  <MenuItem component={LinkBehavior} to="/roles">Administrar roles</MenuItem>
                </Menu>

                <Button
                  color="inherit"
                  onClick={() => setAnchorElUsuarios(true)}
                  style={{ color: '#2F2F2F', fontSize: '20px' }}
                >
                  Administrador de Usuarios
                </Button>
                <Menu
                  anchorEl={anchorElUsuarios}
                  open={Boolean(anchorElUsuarios)}
                  onClose={() => setAnchorElUsuarios(false)}
                >
                  <MenuItem component={LinkBehavior} to="/vendedores">Vendedores</MenuItem>
                  <MenuItem component={LinkBehavior} to="/empleado">Empleados</MenuItem>
                  <MenuItem component={LinkBehavior} to="/cliente">Clientes</MenuItem>
                </Menu>
              </>
            )}

            {(userRole === 'Administrador' || userRole === 'Empleado') && (
              <>
                <Button
                  color="inherit"
                  onClick={() => setAnchorElProductos(true)}
                  style={{ color: '#2F2F2F', fontSize: '20px' }}
                >
                  Administrador de Productos
                </Button>
                <Menu
                  anchorEl={anchorElProductos}
                  open={Boolean(anchorElProductos)}
                  onClose={() => setAnchorElProductos(false)}
                >
                  <MenuItem component={LinkBehavior} to="/inventario">Inventario</MenuItem>
                  <MenuItem component={LinkBehavior} to="/catalogo">Catálogos</MenuItem>
                  <MenuItem component={LinkBehavior} to="/productos">Productos</MenuItem>
                  <MenuItem component={LinkBehavior} to="/categoria">Categorías</MenuItem>
                  <MenuItem component={LinkBehavior} to="/HistorialPrecio">Historial de Precios</MenuItem>
                </Menu>
              </>
            )}

            {/* Botón de login/logout */}
            {!isAuthenticated ? (
              <Button
                color="inherit"
                onClick={handleLoginOpen}
                style={{ color: '#2F2F2F', fontSize: '20px' }}
              >
                Iniciar sesión
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleLogout}
                style={{ color: '#2F2F2F', fontSize: '20px' }}
              >
                Cerrar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>

      <Modal open={loginModalOpen} onClose={handleLoginClose}>
        <Box>
          <Login onClose={handleLoginClose} setIsAuthenticated={setIsAuthenticated} />
        </Box>
      </Modal>
    </>
  );
}
