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
  Switch
} from "@mui/material";
import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from "@mui/icons-material";
import './usuario.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ email: '', telefono: '', contraseña: '', username: '', empleado: '', roles: [], activo: true });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuario');
      const data = await response.json();
      setUsuarios(data);
      setFilteredUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setSnackbarMessage("Error al obtener los usuarios");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleToggleActivo = (event) => {
    setUsuario({ ...usuario, activo: event.target.checked });
  };

  const handleSaveUsuario = async () => {
    const url = isEditing ? `http://localhost:3000/api/usuario/${currentId}` : 'http://localhost:3000/api/usuario';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        fetchUsuarios();
        setUsuario({ email: '', telefono: '', contraseña: '', username: '', empleado: '', roles: [], activo: true });
        setIsEditing(false);
        setCurrentId(null);
        setSnackbarMessage(isEditing ? "Usuario actualizado" : "Usuario creado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(isEditing ? 'Error updating usuario:' : 'Error creating usuario:', error);
      setSnackbarMessage("Error al guardar el usuario");
      setOpenSnackbar(true);
    }
  };

  const handleEditClick = (usuario) => {
    setUsuario({ ...usuario });
    setIsEditing(true);
    setCurrentId(usuario._id);
  };

  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuario/${currentId}`, { method: 'DELETE' });

      if (response.ok) {
        fetchUsuarios();
        setOpenDeleteDialog(false);
        setSnackbarMessage("Usuario eliminado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting usuario:', error);
      setSnackbarMessage("Error al eliminar el usuario");
      setOpenSnackbar(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCurrentId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleOpenDetailDialog = (usuario) => {
    setSelectedUsuario(usuario);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedUsuario(null);
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
    setFilteredUsuarios(
      usuarios.filter((usuario) =>
        usuario.username.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortBy(field);
    setFilteredUsuarios(
      [...filteredUsuarios].sort((a, b) => {
        if (a[field] < b[field]) return newSortOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newSortOrder === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  return (
    <Box sx={{ height: { xs: "auto", md: "130vh" }, width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", margin: 0, padding: 0, py: 2 }}>
      <Box sx={{ width: "90%", maxWidth: "100%", padding: { xs: "20px", md: "50px" }, background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))", borderRadius: "30px", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)", backdropFilter: "blur(8px)", backgroundSize: "200% 200%", animation: "shimmer 10s infinite linear" }}>
        <Container>
          <h1>Gestión de Usuarios</h1>
          <form noValidate autoComplete="off">
            <TextField label="Email" name="email" value={usuario.email} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField label="Teléfono" name="telefono" value={usuario.telefono} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Contraseña" name="contraseña" value={usuario.contraseña} onChange={handleInputChange} fullWidth margin="normal" type="password" required />
            <TextField label="Nombre de usuario" name="username" value={usuario.username} onChange={handleInputChange} fullWidth margin="normal" required />
            <Box display="flex" alignItems="center" marginTop={2}>
              <Switch checked={usuario.activo} onChange={handleToggleActivo} />
              <span>{usuario.activo ? "Activo" : "Inactivo"}</span>
            </Box>
            <Button variant="contained" onClick={handleSaveUsuario} style={{ marginTop: 16 }}>{isEditing ? "Actualizar Usuario" : "Crear Usuario"}</Button>
          </form>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Usuarios</h2>
            <TextField label="Buscar por nombre de usuario" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} style={{ width: 250 }} />
          </Box>

          <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 500, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort("username")}>
                      Nombre de Usuario
                      {sortBy === "username" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((usuario) => (
                  <TableRow key={usuario._id}>
                    <TableCell>{usuario.username}</TableCell>
                    <TableCell>{usuario.telefono}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.activo ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDetailDialog(usuario)}>
                        <Info />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(usuario)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(usuario._id)}>
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
            count={filteredUsuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este usuario?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
              <Button onClick={handleDeleteUsuario} color="error">Eliminar</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
            <DialogTitle>Detalles de Usuario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Nombre de usuario:</strong> {selectedUsuario?.username}<br />
                <strong>Email:</strong> {selectedUsuario?.email}<br />
                <strong>Teléfono:</strong> {selectedUsuario?.telefono}<br />
                <strong>Estado:</strong> {selectedUsuario?.activo ? "Activo" : "Inactivo"}<br />
                {/* Puedes añadir más detalles aquí si es necesario */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog}>Cerrar</Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  );
};

export default Usuarios;
