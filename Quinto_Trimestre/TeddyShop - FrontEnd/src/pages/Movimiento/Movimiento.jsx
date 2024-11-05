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



const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    cantidadIngreso: 0,
    cantidadVendida: 0,
    inventario: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/movimiento');
      const data = await response.json();
      setMovimientos(data);
    } catch (error) {
      console.error('Error fetching movimientos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId 
      ? `http://localhost:3000/api/movimiento/${editId}` 
      : 'http://localhost:3000/api/movimiento';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchMovimientos();
        setFormData({ fecha: '', cantidadIngreso: 0, cantidadVendida: 0, inventario: '' });
        setEditId(null);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating/updating movimiento:', error);
    }
  };

  const handleEdit = (movimiento) => {
    setFormData({
      fecha: movimiento.fecha,
      cantidadIngreso: movimiento.cantidadIngreso,
      cantidadVendida: movimiento.cantidadVendida,
      inventario: movimiento.inventario
    });
    setEditId(movimiento._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/movimiento/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchMovimientos();
      } else {
        console.error('Error deleting movimiento:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movimiento:', error);
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
          <h1>Movimientos</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
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
              name="cantidadIngreso"
              value={formData.cantidadIngreso}
              onChange={handleChange}
              placeholder="Cantidad Ingreso"
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
              name="cantidadVendida"
              value={formData.cantidadVendida}
              onChange={handleChange}
              placeholder="Cantidad Vendida"
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
              name="inventario"
              value={formData.inventario}
              onChange={handleChange}
              placeholder="Inventario ID"
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
              {editId ? 'Actualizar' : 'Crear'}
            </Button>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Movimientos</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {movimientos.map((movimiento) => (
                <li key={movimiento._id} style={{ marginBottom: '10px', textAlign: 'left' }}>
                  <strong>Fecha:</strong> {new Date(movimiento.fecha).toLocaleString()} <br />
                  <strong>Cantidad Ingreso:</strong> {movimiento.cantidadIngreso} <br />
                  <strong>Cantidad Vendida:</strong> {movimiento.cantidadVendida} <br />
                  <strong>Inventario:</strong> {movimiento.inventario?._id || 'N/A'} <br />
                  <Box mt={1}>
                    <IconButton onClick={() => handleEdit(movimiento)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(movimiento._id)}>
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

export default Movimientos;
