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
  FormControlLabel, // Importar FormControlLabel
  Checkbox, // Importar Checkbox
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import '../PagesStyle.css';

// Componente principal
const HistorialPrecios = () => {
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [nuevoHistorial, setNuevoHistorial] = useState({
    precio: '',
    fechaInicio: '',
    fechaFin: '',
    estadoPrecio: true,
    producto: '',
  });
  const [editingId, setEditingId] = useState(null);

  // Obtener historial de precios
  const fetchHistorialPrecios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/historialPrecio');
      const data = await response.json();
      setHistorialPrecios(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchHistorialPrecios();
  }, []);

  // Crear nuevo historial de precio
  const crearHistorialPrecio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/historialPrecio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHistorial),
      });

      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de crear
        setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true, producto: '' });
      } else {
        console.error('Error al crear el historial de precio');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  // Actualizar historial de precio
  const actualizarHistorialPrecio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/historialPrecio/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoHistorial),
      });

      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de actualizar
        setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true, producto: '' });
        setEditingId(null); // Resetea el ID de edición
      } else {
        console.error('Error al actualizar el historial de precio');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  // Eliminar historial de precio
  const eliminarHistorialPrecio = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/historialPrecio/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de eliminar
      } else {
        console.error('Error al eliminar el historial de precio');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  // Maneja el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoHistorial((prev) => ({ ...prev, [name]: value }));
  };

  // Iniciar edición
  const iniciarEdicion = (historial) => {
    setNuevoHistorial(historial);
    setEditingId(historial._id);
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
          <h1>Historial de Precios</h1>
  
          <form onSubmit={editingId ? actualizarHistorialPrecio : crearHistorialPrecio} noValidate autoComplete="off">
            <TextField
              type="number"
              name="precio"
              label="Precio"
              value={nuevoHistorial.precio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="date"
              name="fechaInicio"
              label="Fecha de Inicio"
              value={nuevoHistorial.fechaInicio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              type="date"
              name="fechaFin"
              label="Fecha de Fin"
              value={nuevoHistorial.fechaFin}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="estadoPrecio"
                  checked={nuevoHistorial.estadoPrecio}
                  onChange={(e) => setNuevoHistorial({ ...nuevoHistorial, estadoPrecio: e.target.checked })}
                />
              }
              label="Estado Precio"
              sx={{
                '& .MuiTypography-root': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              name="producto"
              label="ID del Producto"
              value={nuevoHistorial.producto}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Historial de Precios</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {historialPrecios.map((historial) => (
                <li key={historial._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    Precio: {historial.precio} - Desde: {new Date(historial.fechaInicio).toLocaleDateString()} - Hasta: {new Date(historial.fechaFin).toLocaleDateString()} - Estado: {historial.estadoPrecio ? 'Activo' : 'Inactivo'}
                  </span>
                  <Box>
                    <IconButton onClick={() => iniciarEdicion(historial)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => eliminarHistorialPrecio(historial._id)}>
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

export default HistorialPrecios;
