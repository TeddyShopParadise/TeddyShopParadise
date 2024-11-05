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

const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categorias');
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const crearCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreCategoria, descripcionCategoria }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const actualizarCategoria = async () => {
    if (!editingId || !nombreCategoria || !descripcionCategoria) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/categorias/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreCategoria, descripcionCategoria }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la categoría');
        }

        fetchCategorias();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const editarCategoria = (categoria) => {
    setEditingId(categoria._id);
    setNombreCategoria(categoria.nombreCategoria);
    setDescripcionCategoria(categoria.descripcionCategoria);
  };

  const resetForm = () => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setEditingId(null);
  };

  useEffect(() => {
    fetchCategorias();
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
          <h1>Gestión de Categorías</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingId ? actualizarCategoria() : crearCategoria();
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              placeholder="Nombre de la categoría"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              label="Nombre de la categoría"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              placeholder="Descripción de la categoría"
              value={descripcionCategoria}
              onChange={(e) => setDescripcionCategoria(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              label="Descripción de la categoría"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                type="submit"
                variant="contained"
                sx={{ fontSize: '1.2rem', width: '48%' }}
              >
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={resetForm}
                sx={{
                  fontSize: '1.2rem',
                  width: '48%',
                  backgroundColor: 'transparent',
                }}
              >
                Cancelar
              </Button>
            </Box>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Categorías</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {categorias.map((cat) => (
                <li
                  key={cat._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>
                    {cat.nombreCategoria} - {cat.descripcionCategoria}
                  </span>
                  <Box>
                    <IconButton onClick={() => editarCategoria(cat)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => eliminarCategoria(cat._id)}>
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

export default CategoriaComponent;
