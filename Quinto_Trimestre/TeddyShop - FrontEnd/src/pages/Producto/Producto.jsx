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
import { Edit, Delete, Info } from "@mui/icons-material";
import '../PagesStyle.css';

import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const API_URL = apiUrl + "/producto";

const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [producto, setProducto] = useState({ 
    estiloProducto: '', 
    cmCabezaColaProducto: '', 
    materialProducto: '', 
    disponibilidadProducto: '', 
    cmColaPataProducto: '', 
    tamañoProducto: '',
    imagen: '',
    historialPrecios: [],
    catalogos: [],
    categorias: []
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProductos(data);
      setFilteredProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
      setSnackbarMessage("Error al obtener los productos");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSaveProducto = async () => {
    const url = editMode ? `${API_URL}/${selectedId}` : API_URL;
    const method = editMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (response.ok) {
        fetchProductos();
        setProducto({ 
          estiloProducto: '', 
          cmCabezaColaProducto: '', 
          materialProducto: '', 
          disponibilidadProducto: '', 
          cmColaPataProducto: '', 
          tamañoProducto: '',
          imagen: '',
          historialPrecios: [],
          catalogos: [],
          categorias: []
        });
        setEditMode(false);
        setSelectedId(null);
        setSnackbarMessage(editMode ? "Producto actualizado" : "Producto creado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(editMode ? 'Error updating producto:' : 'Error creating producto:', error);
      setSnackbarMessage("Error al guardar el producto");
      setOpenSnackbar(true);
    }
  };

  const handleEditClick = (producto) => {
    setProducto({ ...producto });
    setEditMode(true);  
    setSelectedId(producto._id);  
  };
  

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteProducto = async () => {
    try {
      const response = await fetch(`${API_URL}/${selectedId}`, { method: 'DELETE' });

      if (response.ok) {
        fetchProductos();
        setOpenDeleteDialog(false);
        setSnackbarMessage("Producto eliminado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error deleting producto:', error);
      setSnackbarMessage("Error al eliminar el producto");
      setOpenSnackbar(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleOpenDetailDialog = (producto) => {
    setSelectedProducto(producto);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedProducto(null);
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
    setFilteredProductos(
      productos.filter((producto) =>
        producto.estiloProducto.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <Box sx={{ height: { xs: "auto", md: "auto" }, width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", margin: 0, padding: 0, py: 2 }}>
      <Box sx={{ width: "90%", maxWidth: "100%", padding: { xs: "20px", md: "50px" }, background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))", borderRadius: "30px", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)", backdropFilter: "blur(8px)", backgroundSize: "200% 200%", animation: "shimmer 10s infinite linear" }}>
        <Container>
          <h1>Gestión de Productos</h1>
          <form noValidate autoComplete="off">
            <TextField label="Estilo" name="estiloProducto" value={producto.estiloProducto} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField label="CM Cabeza Cola" name="cmCabezaColaProducto" value={producto.cmCabezaColaProducto} onChange={handleInputChange} fullWidth margin="normal" />
            <TextField label="Material" name="materialProducto" value={producto.materialProducto} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField label="Disponibilidad" name="disponibilidadProducto" value={producto.disponibilidadProducto} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField label="CM Cola Pata" name="cmColaPataProducto" value={producto.cmColaPataProducto} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField label="Tamaño" name="tamañoProducto" value={producto.tamañoProducto} onChange={handleInputChange} fullWidth margin="normal" required />
            <TextField
  label="Imagen"
  name="imagen"
  value={producto.imagen}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
/>
            <Button variant="contained" onClick={handleSaveProducto} style={{ marginTop: 16 }}>{editMode ? "Actualizar Producto" : "Crear Producto"}</Button>
          </form>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Productos</h2>
            <TextField label="Buscar por estilo" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} style={{ width: 250 }} />
          </Box>

          <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 500, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Estilo</TableCell>
                  <TableCell>Tamaño Oso</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Disponibilidad</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProductos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto) => (
                  <TableRow key={producto._id}>
                    <TableCell>{producto.estiloProducto}</TableCell>
                    <TableCell>{producto.tamañoProducto}</TableCell>
                    <TableCell>{producto.materialProducto}</TableCell>
                    <TableCell>{producto.disponibilidadProducto}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDetailDialog(producto)}>
                        <Info />
                      </IconButton>
                      <IconButton onClick={() => handleEditClick(producto)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(producto._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredProductos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>¿Está seguro de que desea eliminar este producto?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
              <Button onClick={handleDeleteProducto} color="error">Eliminar</Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success">{snackbarMessage}</Alert>
          </Snackbar>

          <Dialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
            <DialogTitle>Detalles del Producto</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>Estilo:</strong> {selectedProducto?.estiloProducto}<br />
                <strong>CM Cabeza Cola:</strong> {selectedProducto?.cmCabezaColaProducto}<br />
                <strong>Material:</strong> {selectedProducto?.materialProducto}<br />
                <strong>Disponibilidad:</strong> {selectedProducto?.disponibilidadProducto}<br />
                <strong>CM Cola Pata:</strong> {selectedProducto?.cmColaPataProducto}<br />
                <strong>Tamaño:</strong> {selectedProducto?.tamañoProducto}<br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetailDialog}>Cerrar</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default Producto;
