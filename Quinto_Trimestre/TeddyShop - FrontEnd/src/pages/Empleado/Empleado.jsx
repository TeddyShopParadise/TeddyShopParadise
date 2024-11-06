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
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    dniEmpleado: '',
    telefonoEmpleado: '',
    codigoEmpleado: '',
    fechaNacimientoEmpleado: '',
    nombreEmpleado: '',
    compania: '',
    administrador: '',
    usuario: '',
    vendedor: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('codigoEmpleado');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch empleados from the API
  const fetchEmpleados = async () => {
    const response = await fetch('http://localhost:3000/api/empleado');
    const data = await response.json();
    setEmpleados(data);
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Create or Update empleado
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `http://localhost:3000/api/empleado/${currentId}` : 'http://localhost:3000/api/empleado';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      dniEmpleado: '',
      telefonoEmpleado: '',
      codigoEmpleado: '',
      fechaNacimientoEmpleado: '',
      nombreEmpleado: '',
      compania: '',
      administrador: '',
      usuario: '',
      vendedor: ''
    });
    setEditMode(false);
    setCurrentId(null);
    fetchEmpleados();
  };

  // Edit empleado
  const handleEdit = (empleado) => {
    setFormData(empleado);
    setEditMode(true);
    setCurrentId(empleado._id);
  };

  // Delete empleado
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/empleado/${id}`, {
      method: 'DELETE',
    });
    fetchEmpleados();
  };

  // Handle open dialog for details
  const handleDetails = (empleado) => {
    setSelectedEmpleado(empleado);
    setOpenDialog(true);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmpleado(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEmpleados = empleados.filter((empleado) =>
    empleado.codigoEmpleado && empleado.codigoEmpleado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmpleados = [...filteredEmpleados].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '200vh' },
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
          <h1>Empleados</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="number"
              name="dniEmpleado"
              label="DNI"
              value={formData.dniEmpleado}
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
              name="telefonoEmpleado"
              label="Teléfono"
              value={formData.telefonoEmpleado}
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
              type="text"
              name="codigoEmpleado"
              label="Código"
              value={formData.codigoEmpleado}
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
              name="fechaNacimientoEmpleado"
              value={formData.fechaNacimientoEmpleado}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              name="nombreEmpleado"
              label="Nombre"
              value={formData.nombreEmpleado}
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
              type="text"
              name="compania"
              label="Compañía"
              value={formData.compania}
              onChange={handleChange}
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
              name="administrador"
              label="Administrador"
              value={formData.administrador}
              onChange={handleChange}
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
              name="usuario"
              label="Usuario"
              value={formData.usuario}
              onChange={handleChange}
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
              name="vendedor"
              label="Vendedor"
              value={formData.vendedor}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              {editMode ? 'Actualizar' : 'Crear'}
            </Button>
          </form>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Lista de Empleados</h2>
            <TextField
              label="Buscar por nombre"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: 250 }}
            />
          </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empleados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empleado) => (
                    <TableRow key={empleado._id}>
                      <TableCell>{empleado.codigoEmpleado}</TableCell>
                      <TableCell>{empleado.nombreEmpleado}</TableCell>
                      <TableCell>{empleado.telefonoEmpleado}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(empleado)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(empleado._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleDetails(empleado)}>
                          <Info />
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
              count={sortedEmpleados.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
      </Box>

      {/* Dialog for employee details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Empleado</DialogTitle>
        <DialogContent>
          {selectedEmpleado && (
            <DialogContentText>
              <strong>Nombre:</strong> {selectedEmpleado.nombreEmpleado}<br />
              <strong>DNI:</strong> {selectedEmpleado.dniEmpleado}<br />
              <strong>Teléfono:</strong> {selectedEmpleado.telefonoEmpleado}<br />
              <strong>Código:</strong> {selectedEmpleado.codigoEmpleado}<br />
              {/*<strong>Compañía:</strong> {selectedEmpleado.compania}<br />*/}
              <strong>Administrador:</strong> {selectedEmpleado.administrador}<br />
              <strong>Usuario:</strong> {selectedEmpleado.usuario}<br />
              <strong>Vendedor:</strong> {selectedEmpleado.vendedor}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Empleado;
