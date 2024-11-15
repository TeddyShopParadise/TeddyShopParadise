import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = { email, contraseña };

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('authToken', data.token);

        let decodedToken;
        try {
          decodedToken = JSON.parse(atob(data.token.split('.')[1]));
          console.log("Token decodificado:", decodedToken); // Verifica el contenido del token
        } catch (e) {
          setMessage('Error al decodificar el token');
          setOpen(true);
          setIsAuthenticated(false);
          return;
        }

        // Verificar roles en el token decodificado (basado en nombres de roles)
        const userRoles = Array.isArray(decodedToken.roles) ? decodedToken.roles : [];
        console.log("Roles del usuario:", userRoles); // Verifica si los roles están presentes y son correctos
        let userRole = null;

        if (userRoles.includes('Administrador')) {
          userRole = 'Administrador';
        } else if (userRoles.includes('Empleado')) {
          userRole = 'Empleado';
        }

        if (userRole) {
          setMessage(`Login exitoso como ${userRole.toLowerCase()}`);
          setIsAuthenticated(true);
          navigate(userRole === 'Administrador' ? '/admin' : '/vendedor');
        } else {
          setMessage('Rol desconocido. Contacte con soporte.');
          setIsAuthenticated(false);
        }
        setOpen(true);
      } else {
        setMessage(data.message || 'Error al iniciar sesión');
        setOpen(true);
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={message.includes('exitoso') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
