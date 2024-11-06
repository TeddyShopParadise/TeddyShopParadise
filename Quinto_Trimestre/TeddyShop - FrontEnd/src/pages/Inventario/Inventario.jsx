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

const Inventario = () => {
    const [inventarios, setInventarios] = useState([]);
    const [nuevoInventario, setNuevoInventario] = useState({
        stockMinimo: 0,
        precioVenta: 0,
        precioCompra: 0,
        stock: 0,
        stockMaximo: 0,
        productoIdProducto: ''
    });
    const [selectedInventario, setSelectedInventario] = useState(null);

    // Obtener todos los inventarios
    const fetchInventarios = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/inventario');
            if (!response.ok) throw new Error('Error al obtener los inventarios');
            const data = await response.json();
            setInventarios(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Crear un nuevo inventario
    const crearInventario = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/inventario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoInventario)
            });
            if (!response.ok) throw new Error('Error al crear el inventario');
            fetchInventarios(); // Actualizar la lista de inventarios
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Actualizar un inventario
    const actualizarInventario = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedInventario)
            });
            if (!response.ok) throw new Error('Error al actualizar el inventario');
            fetchInventarios(); // Actualizar la lista de inventarios
            setSelectedInventario(null); // Resetear el estado seleccionado
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Eliminar un inventario
    const eliminarInventario = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/inventario/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar el inventario');
            fetchInventarios(); // Actualizar la lista de inventarios
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchInventarios();
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
              <h1>Inventario</h1>
      
              <h2>Crear Inventario</h2>
              <TextField
                type="number"
                label="Stock Mínimo"
                value={nuevoInventario.stockMinimo}
                onChange={(e) => setNuevoInventario({ ...nuevoInventario, stockMinimo: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <TextField
                type="number"
                label="Precio Venta"
                value={nuevoInventario.precioVenta}
                onChange={(e) => setNuevoInventario({ ...nuevoInventario, precioVenta: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <TextField
                type="number"
                label="Precio Compra"
                value={nuevoInventario.precioCompra}
                onChange={(e) => setNuevoInventario({ ...nuevoInventario, precioCompra: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <TextField
                type="number"
                label="Stock"
                value={nuevoInventario.stock}
                onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <TextField
                type="number"
                label="Stock Máximo"
                value={nuevoInventario.stockMaximo}
                onChange={(e) => setNuevoInventario({ ...nuevoInventario, stockMaximo: e.target.value })}
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
                label="ID Producto"
                value={nuevoInventario.productoIdProducto}
                onChange={(e) => setNuevoInventario({ ...nuevoInventario, productoIdProducto: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <Button variant="contained" onClick={crearInventario} sx={{ marginTop: 2, fontSize: '1.2rem' }}>
                Crear Inventario
              </Button>
      
              <h2>Lista de Inventarios</h2>
              <Box mt={2}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {inventarios.map((inventario) => (
                  <li key={inventario.idInventario} style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '1.2rem' }}>ID: {inventario.idInventario}</p>
                    <p style={{ fontSize: '1.2rem' }}>Stock Mínimo: {inventario.stockMinimo}</p>
                    
                    {/* Verificamos que los precios no sean objetos antes de renderizarlos */}
                    <p style={{ fontSize: '1.2rem' }}>
                      Precio Venta: {inventario.precioVenta && inventario.precioVenta.$numberDecimal
                        ? inventario.precioVenta.$numberDecimal
                        : inventario.precioVenta
                      }
                    </p>
                    
                    <p style={{ fontSize: '1.2rem' }}>
                      Precio Compra: {inventario.precioCompra && inventario.precioCompra.$numberDecimal
                        ? inventario.precioCompra.$numberDecimal
                        : inventario.precioCompra
                      }
                    </p>

                    <p style={{ fontSize: '1.2rem' }}>Stock: {inventario.stock}</p>
                    <p style={{ fontSize: '1.2rem' }}>Stock Máximo: {inventario.stockMaximo}</p>
                    <Box>
                      <IconButton onClick={() => setSelectedInventario(inventario)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => eliminarInventario(inventario.idInventario)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </li>
                ))}
              </ul>
              </Box>
      
              {selectedInventario && (
                <Box mt={4}>
                  <h2>Actualizar Inventario</h2>
                  <TextField
                    type="number"
                    label="Stock Mínimo"
                    value={selectedInventario.stockMinimo}
                    onChange={(e) => setSelectedInventario({ ...selectedInventario, stockMinimo: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input': { fontSize: '1.2rem' },
                    }}
                  />
                  <TextField
                    type="number"
                    label="Precio Venta"
                    value={selectedInventario.precioVenta}
                    onChange={(e) => setSelectedInventario({ ...selectedInventario, precioVenta: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input': { fontSize: '1.2rem' },
                    }}
                  />
                  <TextField
                    type="number"
                    label="Precio Compra"
                    value={selectedInventario.precioCompra}
                    onChange={(e) => setSelectedInventario({ ...selectedInventario, precioCompra: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input': { fontSize: '1.2rem' },
                    }}
                  />
                  <TextField
                    type="number"
                    label="Stock"
                    value={selectedInventario.stock}
                    onChange={(e) => setSelectedInventario({ ...selectedInventario, stock: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input': { fontSize: '1.2rem' },
                    }}
                  />
                  <TextField
                    type="number"
                    label="Stock Máximo"
                    value={selectedInventario.stockMaximo}
                    onChange={(e) => setSelectedInventario({ ...selectedInventario, stockMaximo: e.target.value })}
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
                    label="ID Producto"
                    value={selectedInventario.productoIdProducto}
                    onChange={(e) => setSelectedInventario({ ...selectedInventario, productoIdProducto: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                      '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input': { fontSize: '1.2rem' },
                    }}
                  />
                  <Box mt={2}>
                    <Button variant="contained" onClick={() => actualizarInventario(selectedInventario.idInventario)} sx={{ marginRight: 2 }}>
                      Actualizar Inventario
                    </Button>
                    <Button variant="outlined" onClick={() => setSelectedInventario(null)}>
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              )}
            </Container>
          </Box>
        </Box>
      );
      
};

export default Inventario;
