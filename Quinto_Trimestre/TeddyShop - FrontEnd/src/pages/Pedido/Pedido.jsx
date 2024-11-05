import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
  Box,
  TablePagination,
  Switch,
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
import '../PagesStyle.css';

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    tamañoOso: '',
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
    apellidoAgendador: '',
    apellidoComprador: '',
    detallesPedido: [],
    facturas: [],
    vendedores: []
  });
  const [pedidoEdicion, setPedidoEdicion] = useState(null);
  const [error, setError] = useState(null);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pedido');
        if (!response.ok) {
          throw new Error('Error al obtener pedidos');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    obtenerPedidos();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido({ ...nuevoPedido, [name]: value });
  };

  // Crear nuevo pedido
  const crearPedido = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPedido)
      });

      if (!response.ok) {
        throw new Error('Error al crear pedido');
      }
      const data = await response.json();
      setPedidos([...pedidos, data]);
      setNuevoPedido({
        tamañoOso: '',
        nombreComprador: '',
        numeroComprador: '',
        nombreAgendador: '',
        numeroAgendador: '',
        localidad: '',
        direccion: '',
        barrio: '',
        cliente: '',
        apellidoAgendador: '',
        apellidoComprador: '',
        detallesPedido: [],
        facturas: [],
        vendedores: []
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Actualizar pedido
  const actualizarPedido = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pedido/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoEdicion)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar pedido');
      }
      const updatedPedido = await response.json();
      setPedidos(pedidos.map((pedido) => (pedido._id === id ? updatedPedido : pedido)));
      setPedidoEdicion(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Eliminar pedido
  const eliminarPedido = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/pedido/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar pedido');
      }
      setPedidos(pedidos.filter((pedido) => pedido._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '130vh' },
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        py: 2,
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '100%',
          padding: { xs: '20px', md: '50px' },
          background:
            'linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))',
          borderRadius: '30px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 10s infinite linear',
        }}
      >
        <Container>
          <h1>Gestión de Pedidos</h1>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={crearPedido} noValidate autoComplete="off">
            <TextField
              type="text"
              name="tamañoOso"
              label="Tamaño del Oso"
              value={nuevoPedido.tamañoOso}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <TextField
              type="text"
              name="nombreComprador"
              label="Nombre del Comprador"
              value={nuevoPedido.nombreComprador}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            {/* Agregar más campos según sea necesario */}
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              Crear Pedido
            </Button>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Pedidos</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {pedidos.map((pedido) => (
                <li key={pedido._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>{pedido.nombreComprador}</span>
                  <Box>
                    <IconButton onClick={() => setPedidoEdicion(pedido)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => eliminarPedido(pedido._id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
  
          {pedidoEdicion && (
            <Box mt={4}>
              <h3>Editar Pedido</h3>
              <form onSubmit={() => actualizarPedido(pedidoEdicion._id)}>
                <TextField
                  type="text"
                  name="nombreComprador"
                  label="Nombre del Comprador"
                  value={pedidoEdicion.nombreComprador}
                  onChange={(e) => setPedidoEdicion({ ...pedidoEdicion, nombreComprador: e.target.value })}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                    '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
                  }}
                />
                {/* Agregar más campos según sea necesario */}
                <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
                  Actualizar Pedido
                </Button>
              </form>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
  
  
};

export default Pedido;
