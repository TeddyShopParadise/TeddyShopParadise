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

const DetallePedido = () => {
  const [detalles, setDetalles] = useState([]);
  const [detalle, setDetalle] = useState({
    numDetalle: '',
    precioDetallePedido: '',
    cantidadDetallePedido: '',
    pedidoNumPedido: '',
    productoIdProducto: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Función para obtener los detalles de pedido
  const fetchDetalles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/detallesPedido', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al obtener los detalles de pedido');
      }
      const data = await response.json();
      setDetalles(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Efecto para cargar detalles al montar el componente
  useEffect(() => {
    fetchDetalles();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario para crear o actualizar un detalle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId 
      ? `http://localhost:3000/api/detallesPedido/${editingId}` 
      : 'http://localhost:3000/api/detallesPedido';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalle),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el detalle de pedido');
      }

      fetchDetalles();
      setDetalle({
        numDetalle: '',
        precioDetallePedido: '',
        cantidadDetallePedido: '',
        pedidoNumPedido: '',
        productoIdProducto: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar la edición de un detalle
  const handleEdit = (detalle) => {
    setDetalle(detalle);
    setEditingId(detalle._id);
  };

  // Manejar la eliminación de un detalle
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/detallesPedido/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el detalle de pedido');
      }

      fetchDetalles();
    } catch (error) {
      console.error(error);
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
          <h1>Detalles de Pedido</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="number"
              name="numDetalle"
              label="Número de Detalle"
              value={detalle.numDetalle}
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
              type="number"
              name="precioDetallePedido"
              label="Precio"
              value={detalle.precioDetallePedido}
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
              type="number"
              name="cantidadDetallePedido"
              label="Cantidad"
              value={detalle.cantidadDetallePedido}
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
              name="pedidoNumPedido"
              label="ID de Pedido"
              value={detalle.pedidoNumPedido}
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
              name="productoIdProducto"
              label="ID de Producto"
              value={detalle.productoIdProducto}
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
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Detalles</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {detalles.map((d) => (
                <li key={d._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {`Detalle #${d.numDetalle}, Precio: ${d.precioDetallePedido}, Cantidad: ${d.cantidadDetallePedido}`}
                  </span>
                  <Box>
                    <IconButton onClick={() => handleEdit(d)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(d._id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        </Container>
      </Box>
    </Box>
  );
  
};

export default DetallePedido;
