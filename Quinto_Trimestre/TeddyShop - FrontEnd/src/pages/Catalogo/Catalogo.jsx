import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';

export default function Catalogo() {
  const [catalogos, setCatalogos] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [nombreCatalogo, setNombreCatalogo] = useState('');
  const [descripcionCatalogo, setDescripcionCatalogo] = useState('');
  const [disponibilidadCatalogo, setDisponibilidadCatalogo] = useState(true);
  const [estiloCatalogo, setEstiloCatalogo] = useState('');
  const [compania, setCompania] = useState('');
  const [productos, setProductos] = useState([]);
  const [vendedoresCatalogo, setVendedoresCatalogo] = useState([]);
  const [selectedCatalogoId, setSelectedCatalogoId] = useState(null);
  const [selectedCatalogo, setSelectedCatalogo] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

  const eliminarCatalogo = async () => {
    if (!currentId) return;

    try {
      await fetch(`http://localhost:3000/api/catalogo/${currentId}`, {
        method: 'DELETE',
      });
      setCatalogos((prevCatalogos) => prevCatalogos.filter((catalogo) => catalogo._id !== currentId));
      setSnackbarMessage('Catalogo eliminado con éxito');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error eliminando el Catalogo:', error);
      setSnackbarMessage('Error al eliminar el Catalogo');
      setOpenSnackbar(true);
    } finally {
      setOpenDeleteDialog(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetalles = (catalogo) => {
    setSelectedCatalogo(catalogo);
  };

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '180vh' },
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
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              {selectedCatalogoId ? 'Actualizar' : 'Crear'}
            </Button>
          </form>

          <Box mt={4}>
            <h2>Lista de Catálogos Activos</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Disponibilidad</TableCell>
                    <TableCell>Estilo</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catalogos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((catalogo) => (
                    <TableRow key={catalogo._id}>
                      <TableCell>{catalogo.nombreCatalogo}</TableCell>
                      <TableCell>{catalogo.descripcionCatalogo}</TableCell>
                      <TableCell>{catalogo.disponibilidadCatalogo ? 'Sí' : 'No'}</TableCell>
                      <TableCell>{catalogo.estiloCatalogo}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDetalles(catalogo)}>
                          <Info />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedCatalogoId(catalogo._id);
                            setNombreCatalogo(catalogo.nombreCatalogo);
                            setDescripcionCatalogo(catalogo.descripcionCatalogo);
                            setDisponibilidadCatalogo(catalogo.disponibilidadCatalogo);
                            setEstiloCatalogo(catalogo.estiloCatalogo);
                            setCompania(catalogo.compania);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => {
                        setCurrentId(catalogo._id);
                        setOpenDeleteDialog(true);
                      }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={catalogos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Container>
      </Box>

      <Dialog open={Boolean(selectedCatalogo)} onClose={() => setSelectedCatalogo(null)}>
        <DialogTitle>Detalles del Catálogo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Nombre:</strong> {selectedCatalogo?.nombreCatalogo}
          </DialogContentText>
          <DialogContentText>
            <strong>Descripción:</strong> {selectedCatalogo?.descripcionCatalogo}
          </DialogContentText>
          <DialogContentText>
            <strong>Disponibilidad:</strong> {selectedCatalogo?.disponibilidadCatalogo ? 'Sí' : 'No'}
          </DialogContentText>
          <DialogContentText>
            <strong>Estilo:</strong> {selectedCatalogo?.estiloCatalogo}
          </DialogContentText>
          <DialogContentText>
            <strong>Compañia:</strong> {selectedCatalogo?.compania}
          </DialogContentText>
          <DialogContentText>
            <strong>Productos:</strong> {selectedCatalogo?.productos}
          </DialogContentText>
          <DialogContentText>
            <strong>Vendedor:</strong> {selectedCatalogo?.vendedoresCatalogo}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedCatalogo(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
            <DialogTitle>Eliminar Catalogo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este Catalogo?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
              <Button onClick={eliminarCatalogo} color="error">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
    </Box>
  );
}
