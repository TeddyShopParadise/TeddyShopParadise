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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';

const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const ProductoComponent = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [catalogos, setCatalogos] = useState([]);
  const [estiloProducto, setEstiloProducto] = useState('');
  const [cmCabezaColaProducto, setCmCabezaColaProducto] = useState('');
  const [materialProducto, setMaterialProducto] = useState('');
  const [disponibilidadProducto, setDisponibilidadProducto] = useState('');
  const [cmColaPataProducto, setCmColaPataProducto] = useState('');
  const [tamañoProducto, setTamañoProducto] = useState('');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [catalogosSeleccionados, setCatalogosSeleccionados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/producto`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${apiUrl}/categorias`);
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

  const fetchCatalogos = async () => {
    try {
      const response = await fetch(`${apiUrl}/catalogos/activos`);
      if (!response.ok) {
        throw new Error('Error al obtener los catálogos');
      }
      const data = await response.json();
      setCatalogos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const crearProducto = async () => {
    if (!estiloProducto || !cmCabezaColaProducto || !materialProducto || !disponibilidadProducto || !cmColaPataProducto || !tamañoProducto || categoriasSeleccionadas.length === 0 || catalogosSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/producto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estiloProducto,
          cmCabezaColaProducto,
          materialProducto,
          disponibilidadProducto,
          cmColaPataProducto,
          tamañoProducto,
          categorias: categoriasSeleccionadas,
          catalogos: catalogosSeleccionados,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      fetchProductos();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const actualizarProducto = async () => {
    if (!editingId || !estiloProducto || !cmCabezaColaProducto || !materialProducto || !disponibilidadProducto || !cmColaPataProducto || !tamañoProducto || categoriasSeleccionadas.length === 0 || catalogosSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/producto/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estiloProducto,
          cmCabezaColaProducto,
          materialProducto,
          disponibilidadProducto,
          cmColaPataProducto,
          tamañoProducto,
          categorias: categoriasSeleccionadas,
          catalogos: catalogosSeleccionados,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      fetchProductos();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`${apiUrl}/producto/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }

        fetchProductos();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const editarProducto = (producto) => {
    setEditingId(producto._id);
    setEstiloProducto(producto.estiloProducto);
    setCmCabezaColaProducto(producto.cmCabezaColaProducto);
    setMaterialProducto(producto.materialProducto);
    setDisponibilidadProducto(producto.disponibilidadProducto);
    setCmColaPataProducto(producto.cmColaPataProducto);
    setTamañoProducto(producto.tamañoProducto);
    setCategoriasSeleccionadas(producto.categorias || []);
    setCatalogosSeleccionados(producto.catalogos || []);
  };

  const resetForm = () => {
    setEstiloProducto('');
    setCmCabezaColaProducto('');
    setMaterialProducto('');
    setDisponibilidadProducto('');
    setCmColaPataProducto('');
    setTamañoProducto('');
    setCategoriasSeleccionadas([]);
    setCatalogosSeleccionados([]);
    setEditingId(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const openDetailsDialog = (producto) => {
    setSelectedProducto(producto);
  };

  const closeDetailsDialog = () => {
    setSelectedProducto(null);
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchCatalogos();
  }, []);

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: 'auto' },
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
          <h1>Gestión de Productos</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingId ? actualizarProducto() : crearProducto();
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              placeholder="Estilo del producto"
              value={estiloProducto}
              onChange={(e) => setEstiloProducto(e.target.value)}
              fullWidth
              margin="normal"
              required
              label="Estilo del producto"
            />
            <TextField
              type="text"
              placeholder="CM Cabeza-Cola"
              value={cmCabezaColaProducto}
              onChange={(e) => setCmCabezaColaProducto(e.target.value)}
              fullWidth
              margin="normal"
              required
              label="CM Cabeza-Cola"
            />
            <TextField
              type="text"
              placeholder="Material"
              value={materialProducto}
              onChange={(e) => setMaterialProducto(e.target.value)}
              fullWidth
              margin="normal"
              required
              label="Material"
            />
            <TextField
              type="text"
              placeholder="Disponibilidad"
              value={disponibilidadProducto}
              onChange={(e) => setDisponibilidadProducto(e.target.value)}
              fullWidth
              margin="normal"
              required
              label="Disponibilidad"
            />
            <TextField
              type="text"
              placeholder="CM Cola-Pata"
              value={cmColaPataProducto}
              onChange={(e) => setCmColaPataProducto(e.target.value)}
              fullWidth
              margin="normal"
              required
              label="CM Cola-Pata"
            />
            <TextField
              type="text"
              placeholder="Tamaño"
              value={tamañoProducto}
              onChange={(e) => setTamañoProducto(e.target.value)}
              fullWidth
              margin="normal"
              required
              label="Tamaño"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Categorías</InputLabel>
              <Select
                multiple
                value={categoriasSeleccionadas}
                onChange={(e) => setCategoriasSeleccionadas(e.target.value)}
                label="Categorías"
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.nombreCategoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Catálogos</InputLabel>
              <Select
                multiple
                value={catalogosSeleccionados}
                onChange={(e) => setCatalogosSeleccionados(e.target.value)}
                label="Catálogos"
              >
                {catalogos.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.nombreCatalogo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {editingId ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </form>

          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Estilo</TableCell>
                  <TableCell>CM Cabeza-Cola</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Disponibilidad</TableCell>
                  <TableCell>Tamaño</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productos
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                  .map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell>{producto.estiloProducto}</TableCell>
                      <TableCell>{producto.cmCabezaColaProducto}</TableCell>
                      <TableCell>{producto.materialProducto}</TableCell>
                      <TableCell>{producto.disponibilidadProducto}</TableCell>
                      <TableCell>{producto.tamañoProducto}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => editarProducto(producto)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => eliminarProducto(producto._id)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => openDetailsDialog(producto)}
                        >
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
            count={productos.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Dialogo de detalles */}
          <Dialog open={selectedProducto !== null} onClose={closeDetailsDialog}>
            <DialogTitle>Detalles del Producto</DialogTitle>
            <DialogContent>
              {selectedProducto && (
                <>
                  <DialogContentText><strong>Estilo:</strong> {selectedProducto.estiloProducto}</DialogContentText>
                  <DialogContentText><strong>CM Cabeza-Cola:</strong> {selectedProducto.cmCabezaColaProducto}</DialogContentText>
                  <DialogContentText><strong>Material:</strong> {selectedProducto.materialProducto}</DialogContentText>
                  <DialogContentText><strong>Disponibilidad:</strong> {selectedProducto.disponibilidadProducto}</DialogContentText>
                  <DialogContentText><strong>CM Cola-Pata:</strong> {selectedProducto.cmColaPataProducto}</DialogContentText>
                  <DialogContentText><strong>Tamaño:</strong> {selectedProducto.tamañoProducto}</DialogContentText>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDetailsDialog}>Cerrar</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductoComponent;
