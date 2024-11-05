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

const Compania = () => {
  const [companias, setCompanias] = useState([]);
  const [NIT, setNIT] = useState('');
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Obtener la lista de compañías
  const fetchCompanias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/compania');
      if (!response.ok) {
        throw new Error('Error al obtener las compañías');
      }
      const data = await response.json();
      setCompanias(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Crear nueva compañía
  const crearCompania = async () => {
    if (!NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/compania', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la compañía');
      }

      fetchCompanias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Actualizar compañía
  const actualizarCompania = async () => {
    if (!editingId || !NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/compania/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la compañía');
      }

      fetchCompanias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Eliminar compañía
  const eliminarCompania = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta compañía?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/compania/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la compañía');
        }

        fetchCompanias();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  // Cargar datos para editar
  const editarCompania = (compania) => {
    setEditingId(compania._id);
    setNIT(compania.NIT);
    setTelefonoEmpresa(compania.telefonoEmpresa);
    setNombreEmpresa(compania.nombreEmpresa);
    setDireccionEmpresa(compania.direccionEmpresa);
  };

  // Restablecer formulario
  const resetForm = () => {
    setNIT('');
    setTelefonoEmpresa('');
    setNombreEmpresa('');
    setDireccionEmpresa('');
    setEditingId(null);
  };

  useEffect(() => {
    fetchCompanias();
  }, []);

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
          <h1>Gestión de Compañías</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingId ? actualizarCompania() : crearCompania();
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="number"
              label="NIT"
              value={NIT}
              onChange={(e) => setNIT(e.target.value)}
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
              label="Teléfono de la Empresa"
              value={telefonoEmpresa}
              onChange={(e) => setTelefonoEmpresa(e.target.value)}
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
              label="Nombre de la Empresa"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
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
              label="Dirección de la Empresa"
              value={direccionEmpresa}
              onChange={(e) => setDireccionEmpresa(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained" sx={{ fontSize: '1.2rem' }}>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="outlined"
                sx={{ fontSize: '1.2rem' }}
              >
                Cancelar
              </Button>
            </Box>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Compañías</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {companias.map((comp) => (
                <li
                  key={comp._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                  }}
                >
                  <span>{comp.nombreEmpresa}</span> - <span>{comp.telefonoEmpresa}</span> - <span>{comp.direccionEmpresa}</span>
                  <Box>
                    <IconButton onClick={() => editarCompania(comp)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => eliminarCompania(comp._id)}>
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

export default Compania;
