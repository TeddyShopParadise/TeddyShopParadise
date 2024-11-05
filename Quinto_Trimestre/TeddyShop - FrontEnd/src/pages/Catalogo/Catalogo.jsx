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

export default function Catalogo() {
  const [catalogos, setCatalogos] = useState([]);
  const [nombreCatalogo, setNombreCatalogo] = useState('');
  const [descripcionCatalogo, setDescripcionCatalogo] = useState('');
  const [disponibilidadCatalogo, setDisponibilidadCatalogo] = useState(true);
  const [estiloCatalogo, setEstiloCatalogo] = useState('');
  const [compania, setCompania] = useState('');
  const [productos, setProductos] = useState([]);
  const [vendedoresCatalogo, setVendedoresCatalogo] = useState([]);
  const [selectedCatalogoId, setSelectedCatalogoId] = useState(null);

  useEffect(() => {
    listarCatalogos();
  }, []);

  const listarCatalogos = async () => {
    const response = await fetch('http://localhost:3000/api/catalogos/activos');
    const data = await response.json();
    setCatalogos(data);
  };

  const crearCatalogo = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/catalogos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreCatalogo,
        descripcionCatalogo,
        disponibilidadCatalogo,
        estiloCatalogo,
        compania,
        productos,
        vendedoresCatalogo,
      }),
    });

    if (response.ok) {
      alert('Catálogo creado exitosamente');
      listarCatalogos();
      limpiarFormulario();
    } else {
      alert('Error en los datos enviados');
    }
  };

  const actualizarCatalogo = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/catalogos/${selectedCatalogoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreCatalogo,
        descripcionCatalogo,
        disponibilidadCatalogo,
        estiloCatalogo,
        compania,
        productos,
        vendedoresCatalogo,
      }),
    });

    if (response.ok) {
      alert('Catálogo actualizado exitosamente');
      listarCatalogos();
      limpiarFormulario();
      setSelectedCatalogoId(null);
    } else {
      alert('Error en los datos enviados');
    }
  };

  const limpiarFormulario = () => {
    setNombreCatalogo('');
    setDescripcionCatalogo('');
    setDisponibilidadCatalogo(true);
    setEstiloCatalogo('');
    setCompania('');
    setProductos([]);
    setVendedoresCatalogo([]);
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
          <h1>Catálogos</h1>
  
          <form onSubmit={selectedCatalogoId ? actualizarCatalogo : crearCatalogo} noValidate autoComplete="off">
            <h2>{selectedCatalogoId ? 'Actualizar Catálogo' : 'Crear Catálogo'}</h2>
            <TextField
              type="text"
              label="Nombre del Catálogo"
              value={nombreCatalogo}
              onChange={(e) => setNombreCatalogo(e.target.value)}
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
              label="Descripción del Catálogo"
              value={descripcionCatalogo}
              onChange={(e) => setDescripcionCatalogo(e.target.value)}
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
              label="Estilo del Catálogo"
              value={estiloCatalogo}
              onChange={(e) => setEstiloCatalogo(e.target.value)}
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
              label="ID de Compañía"
              value={compania}
              onChange={(e) => setCompania(e.target.value)}
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
              label="Productos (IDs separados por comas)"
              value={productos.join(', ')}
              onChange={(e) => setProductos(e.target.value.split(',').map(p => p.trim()))}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              label="Vendedores (IDs separados por comas)"
              value={vendedoresCatalogo.join(', ')}
              onChange={(e) => setVendedoresCatalogo(e.target.value.split(',').map(v => v.trim()))}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={disponibilidadCatalogo}
                  onChange={() => setDisponibilidadCatalogo(!disponibilidadCatalogo)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }}
                />
              }
              label="Disponibilidad"
              sx={{ fontSize: '1.2rem' }}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              {selectedCatalogoId ? 'Actualizar' : 'Crear'}
            </Button>
          </form>
  
          <Box mt={4}>
            <h2>Lista de Catálogos Activos</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {catalogos.map((catalogo) => (
                <li key={catalogo._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <p style={{ fontSize: '1.2rem' }}>Nombre: {catalogo.nombreCatalogo}</p>
                    <p style={{ fontSize: '1.2rem' }}>Descripción: {catalogo.descripcionCatalogo}</p>
                    <p style={{ fontSize: '1.2rem' }}>
                      Disponibilidad: {catalogo.disponibilidadCatalogo ? 'Sí' : 'No'}
                    </p>
                    <p style={{ fontSize: '1.2rem' }}>Estilo: {catalogo.estiloCatalogo}</p>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setSelectedCatalogoId(catalogo._id);
                        setNombreCatalogo(catalogo.nombreCatalogo);
                        setDescripcionCatalogo(catalogo.descripcionCatalogo);
                        setDisponibilidadCatalogo(catalogo.disponibilidadCatalogo);
                        setEstiloCatalogo(catalogo.estiloCatalogo);
                        setCompania(catalogo.compania);
                        setProductos(catalogo.productos);
                        setVendedoresCatalogo(catalogo.vendedoresCatalogo);
                      }}
                    >
                      <Edit />
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
  
}
