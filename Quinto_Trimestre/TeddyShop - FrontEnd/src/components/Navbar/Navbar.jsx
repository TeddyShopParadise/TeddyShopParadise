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
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Cambiar nombre de Link a RouterLink
import LinkBehavior from './LInkBehavior';
import logoTeddyShop from '../../assets/img/LogoTeddyShop.jpg';
import Login from '../../pages/login/login';


export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElRoles, setAnchorElRoles] = useState(null);
  const [anchorElUsuarios, setAnchorElUsuarios] = useState(null);
  const [anchorElProductos, setAnchorElProductos] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [anchorElVerProductos, setAnchorElVerProductos] = useState(null);
  useEffect(() => {
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
    navigate('/'); // Redirigir al home después de cerrar sesión
  };

  const drawer = (
    <List sx={{ width: 250 }}>
      {['Productos-usuario', 'Categorias-usuario', 'Catalogos-usuario'].map((text, index) => (
        <ListItem 
          button 
          component={LinkBehavior} 
          to={`/${normalizeText(text)}`} 
          key={text} 
          sx={{ padding: '12px 20px' }} 
        >
          <ListItemText primary={text} sx={{ textAlign: 'center', color:'black' }} />
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
              component={RouterLink}
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
                  onClick={(event) => setAnchorElRoles(event.currentTarget)}
                  style={{ color: '#2F2F2F', fontSize: '20px' }}
                >
                  Administrador de Roles
                </Button>
                <Menu
                  anchorEl={anchorElRoles}
                  open={Boolean(anchorElRoles)}
                  onClose={() => setAnchorElRoles(null)}
                >
                  <MenuItem component={LinkBehavior} to="/roles" onClick={() => setAnchorElRoles(null)}>Administrar roles</MenuItem>
                </Menu>

                <Button
                  color="inherit"
                  onClick={(event) => setAnchorElUsuarios(event.currentTarget)}
                  style={{ color: '#2F2F2F', fontSize: '20px' }}
                >
                  Administrador de Usuarios
                </Button>
                <Menu
                  anchorEl={anchorElUsuarios}
                  open={Boolean(anchorElUsuarios)}
                  onClose={() => setAnchorElUsuarios(null)}
                >
                  <MenuItem component={LinkBehavior} to="/vendedores" onClick={() => setAnchorElUsuarios(null)}>Vendedores</MenuItem>
                  <MenuItem component={LinkBehavior} to="/empleado" onClick={() => setAnchorElUsuarios(null)}>Empleados</MenuItem>
                  <MenuItem component={LinkBehavior} to="/cliente" onClick={() => setAnchorElUsuarios(null)}>Clientes</MenuItem>
                </Menu>
              </>
            )}

            {(userRole === 'Administrador' || userRole === 'Empleado') && (
              <>
                <Button
                  color="inherit"
                  onClick={(event) => setAnchorElProductos(event.currentTarget)}
                  style={{ color: '#2F2F2F', fontSize: '20px' }}
                >
                  Administrador de Productos
                </Button>
                <Menu
                  anchorEl={anchorElProductos}
                  open={Boolean(anchorElProductos)}
                  onClose={() => setAnchorElProductos(null)}
                >
                  <MenuItem component={LinkBehavior} to="/inventario" onClick={() => setAnchorElProductos(null)}>Inventario</MenuItem>
                  <MenuItem component={LinkBehavior} to="/catalogo" onClick={() => setAnchorElProductos(null)}>Catálogos</MenuItem>
                  <MenuItem component={LinkBehavior} to="/productos" onClick={() => setAnchorElProductos(null)}>Productos</MenuItem>
                  <MenuItem component={LinkBehavior} to="/categoria" onClick={() => setAnchorElProductos(null)}>Categorías</MenuItem>
                  <MenuItem component={LinkBehavior} to="/HistorialPrecio" onClick={() => setAnchorElProductos(null)}>Historial de Precios</MenuItem>
                </Menu>
              </>
            )}

            <Button
              color="inherit"
              onClick={(event) => setAnchorElVerProductos(event.currentTarget)}
              style={{ color: '#2F2F2F', fontSize: '20px' }}
            >
              Menú de Productos
            </Button>
            <Menu
              anchorEl={anchorElVerProductos}
              open={Boolean(anchorElVerProductos)}
              onClose={() => setAnchorElVerProductos(null)}
            >
              <MenuItem component={LinkBehavior} to="/catalogos-usuario" onClick={() => setAnchorElVerProductos(null)}>Catálogos</MenuItem>
              <MenuItem component={LinkBehavior} to="/productos-usuario" onClick={() => setAnchorElVerProductos(null)}>Productos</MenuItem>
            </Menu>   

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

      {/* Drawer personalizado para móviles */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#F3E5F5',
            width: '70vw',
            color: 'black',
          },
        }}
      >
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