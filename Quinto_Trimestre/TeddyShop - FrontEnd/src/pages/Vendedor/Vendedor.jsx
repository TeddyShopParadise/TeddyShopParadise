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



const Vendedores = () => {
  const [vendedores, setVendedores] = useState([]);
  const [filteredVendedores, setFilteredVendedores] = useState([]);
  const [dniEmpleado, setDniEmpleado] = useState('');
  const [codigoVendedor, setCodigoVendedor] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('codigoVendedor');
  const [sortOrder, setSortOrder] = useState('asc');
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedVendedor, setSelectedVendedor] = useState(null);

  const fetchVendedores = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/vendedor');
      const data = await response.json();
      setVendedores(data);
      setFilteredVendedores(data);
    } catch (error) {
      console.error('Error al obtener vendedores:', error);
      setSnackbarMessage('Error al obtener los vendedores');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchVendedores();
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'dniEmpleado') {
      setDniEmpleado(e.target.value);
    } else if (e.target.name === 'codigoVendedor') {
      setCodigoVendedor(e.target.value);
    }
  };

  const handleSaveVendedor = async () => {
    const url = isEditing ? `http://localhost:3000/api/vendedor/${currentId}` : 'http://localhost:3000/api/vendedor';
    const method = isEditing ? 'PUT' : 'POST';
    const newVendedor = { dniEmpleado, codigoVendedor };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVendedor),
      });

      if (response.ok) {
        fetchVendedores();
        setDniEmpleado('');
        setCodigoVendedor('');
        setIsEditing(false);
        setCurrentId(null);
        setSnackbarMessage(isEditing ? 'Vendedor actualizado' : 'Vendedor creado');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(isEditing ? 'Error updating vendedor:' : 'Error creating vendedor:', error);
      setSnackbarMessage('Error al guardar el vendedor');
      setOpenSnackbar(true);
    }
  };

  const handleEditClick = (vendedor) => {
    setDniEmpleado(vendedor.dniEmpleado);
    setCodigoVendedor(vendedor.codigoVendedor);
    setIsEditing(true);
    setCurrentId(vendedor._id);
  };

  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteVendedor = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/vendedor/${currentId}`, { method: 'DELETE' });

      if (response.ok) {
        fetchVendedores();
        setOpenDeleteDialog(false);
        setSnackbarMessage('Vendedor eliminado');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting vendedor:', error);
      setSnackbarMessage('Error al eliminar el vendedor');
      setOpenSnackbar(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage('');
  };

  const handleOpenDetailDialog = (vendedor) => {
    setSelectedVendedor(vendedor);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedVendedor(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredVendedores(
      vendedores.filter((vendedor) =>
        vendedor.codigoVendedor.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortBy(field);
    setFilteredVendedores(
      [...filteredVendedores].sort((a, b) => {
        if (a[field] < b[field]) return newSortOrder === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return newSortOrder === 'asc' ? 1 : -1;
        return 0;
      })
    );
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
          <h1>Gestión de Vendedores</h1>
          <form noValidate autoComplete="off">
            <TextField
              label="DNI del Empleado"
              name="dniEmpleado"
              value={dniEmpleado}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Código del Vendedor"
              name="codigoVendedor"
              value={codigoVendedor}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              variant="contained"
              onClick={handleSaveVendedor}
              style={{ marginTop: 16 }}
            >
              {isEditing ? 'Actualizar Vendedor' : 'Crear Vendedor'}
            </Button>
          </form>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Vendedores</h2>
            <TextField
              label="Buscar por código de vendedor"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: 250 }}
            />
          </Box>

          <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 500, overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('codigoVendedor')}>
                      Código del Vendedor
                      {sortBy === 'codigoVendedor' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>DNI del Empleado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVendedores
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((vendedor) => (
                    <TableRow key={vendedor._id}>
                      <TableCell>{vendedor.codigoVendedor}</TableCell>
                      <TableCell>{vendedor.dniEmpleado}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(vendedor)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(vendedor._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDetailDialog(vendedor)}>
                          <Info />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredVendedores.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Dialog para confirmación de eliminación */}
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este vendedor?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDeleteVendedor} color="primary">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar para notificaciones */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>

          {/* Dialog de detalles */}
          <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
            <DialogTitle>Detalles del Vendedor</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Código del Vendedor:</strong> {selectedVendedor?.codigoVendedor} <br />
                <strong>DNI del Empleado:</strong> {selectedVendedor?.dniEmpleado} <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default Vendedores;
