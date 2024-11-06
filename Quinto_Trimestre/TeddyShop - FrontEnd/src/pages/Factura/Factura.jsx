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
  Box,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';

const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [factura, setFactura] = useState({
    fechaCreacionFactura: '',
    horaCreacionFactura: '',
    pedido: '',
    cliente: '',
    detallesFactura: [],
    metodoPago: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    listarFacturas();
  }, []);

  const listarFacturas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/factura');
      const data = await response.json();
      setFacturas(data);
    } catch (error) {
      console.error('Error al listar las facturas:', error);
    }
  };

  const crearFactura = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/factura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        listarFacturas();
      } else {
        console.error('Error al crear factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la creación de factura:', error);
    }
  };

  const actualizarFactura = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setEditing(false);
        setCurrentId(null);
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        listarFacturas();
      } else {
        console.error('Error al actualizar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la actualización de factura:', error);
    }
  };

  const obtenerFacturaPorId = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${id}`);
      const data = await response.json();
      setFactura(data);
      setEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error al obtener factura:', error);
    }
  };

  const eliminarFactura = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factura/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        listarFacturas();
      } else {
        console.error('Error al eliminar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la eliminación de factura:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      actualizarFactura();
    } else {
      crearFactura();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDetailDialog = (factura) => {
    setSelectedFactura(factura);
    setOpenDetails(true);
  };

  const closeDetailDialog = () => {
    setOpenDetails(false);
    setSelectedFactura(null);
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
          <h1>{editing ? 'Actualizar Factura' : 'Crear Factura'}</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="date"
              name="fechaCreacionFactura"
              value={factura.fechaCreacionFactura}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              type="time"
              name="horaCreacionFactura"
              value={factura.horaCreacionFactura}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              type="text"
              name="pedido"
              value={factura.pedido}
              onChange={handleChange}
              placeholder="ID del pedido"
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              type="text"
              name="cliente"
              value={factura.cliente}
              onChange={handleChange}
              placeholder="ID del cliente"
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              type="text"
              name="detallesFactura"
              value={factura.detallesFactura.join(', ')}
              onChange={(e) => handleChange({ target: { name: 'detallesFactura', value: e.target.value.split(', ') } })}
              placeholder="Detalles de la factura (separados por comas)"
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              type="text"
              name="metodoPago"
              value={factura.metodoPago}
              onChange={handleChange}
              placeholder="ID del método de pago"
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              {editing ? 'Actualizar' : 'Crear'}
            </Button>
          </form>

          <Box mt={4}>
            <h2>Lista de Facturas</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Hora</TableCell>
                    <TableCell>Pedido</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {facturas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((factura) => (
                    <TableRow key={factura._id}>
                      <TableCell>{new Date(factura.fechaCreacionFactura).toLocaleDateString()}</TableCell>
                      <TableCell>{factura.horaCreacionFactura}</TableCell>
                      <TableCell>{factura.pedido}</TableCell>
                      <TableCell>{factura.cliente}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => obtenerFacturaPorId(factura._id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarFactura(factura._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => openDetailDialog(factura)}>
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
              count={facturas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Container>

        {/* Detalle Dialog */}
        <Dialog open={openDetails} onClose={closeDetailDialog}>
          <DialogTitle>Detalles de la Factura</DialogTitle>
          <DialogContent>
            {selectedFactura && (
              <DialogContentText>
                <strong>Pedido:</strong> {selectedFactura.pedido}
                <br />
                <strong>Cliente:</strong> {selectedFactura.cliente}
                <br />
                <strong>Detalles:</strong> {selectedFactura.detallesFactura.join(', ')}
                <br />
                <strong>Método de Pago:</strong> {selectedFactura.metodoPago}
                <br />
                <strong>Fecha:</strong> {new Date(selectedFactura.fechaCreacionFactura).toLocaleDateString()}
                <br />
                <strong>Hora:</strong> {selectedFactura.horaCreacionFactura}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetailDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Facturas;
