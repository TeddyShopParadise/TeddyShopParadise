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

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [factura, setFactura] = useState({
    fechaCreacionFactura: '',
    horaCreacionFactura: '',
    pedido: '',
    cliente: '',
    detallesFactura: [],
    metodoPago: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    listarFacturas();
  }, []);

  const listarFacturas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/factura');
      const data = await response.json();
      setFacturas(data);
    } catch (error) {
      console.error('Error al listar las facturas:', error);
    }
  };

  const crearFactura = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/factura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        listarFacturas();
      } else {
        console.error('Error al crear factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la creación de factura:', error);
    }
  };

  const actualizarFactura = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setEditing(false);
        setCurrentId(null);
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        listarFacturas();
      } else {
        console.error('Error al actualizar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la actualización de factura:', error);
    }
  };

  const obtenerFacturaPorId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${id}`);
      const data = await response.json();
      setFactura(data);
      setEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error al obtener factura:', error);
    }
  };

  const eliminarFactura = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        listarFacturas();
      } else {
        console.error('Error al eliminar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la eliminación de factura:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      actualizarFactura();
    } else {
      crearFactura();
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
          <h1>{editing ? 'Actualizar Factura' : 'Crear Factura'}</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="date"
              name="fechaCreacionFactura"
              value={factura.fechaCreacionFactura}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <TextField
              type="time"
              name="horaCreacionFactura"
              value={factura.horaCreacionFactura}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <TextField
              type="text"
              name="pedido"
              value={factura.pedido}
              onChange={handleChange}
              placeholder="ID del pedido"
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
              type="text"
              name="cliente"
              value={factura.cliente}
              onChange={handleChange}
              placeholder="ID del cliente"
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
              type="text"
              name="detallesFactura"
              value={factura.detallesFactura.join(', ')}
              onChange={(e) => handleChange({ target: { name: 'detallesFactura', value: e.target.value.split(', ') } })}
              placeholder="Detalles de la factura (separados por comas)"
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
              type="text"
              name="metodoPago"
              value={factura.metodoPago}
              onChange={handleChange}
              placeholder="ID del método de pago"
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
              {editing ? 'Actualizar' : 'Crear'}
            </Button>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Facturas</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {facturas.map((factura) => (
                <li key={factura._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {`${factura.fechaCreacionFactura} - ${factura.horaCreacionFactura}`}
                  </span>
                  <Box>
                    <IconButton onClick={() => obtenerFacturaPorId(factura._id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => eliminarFactura(factura._id)}>
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

export default Facturas;
