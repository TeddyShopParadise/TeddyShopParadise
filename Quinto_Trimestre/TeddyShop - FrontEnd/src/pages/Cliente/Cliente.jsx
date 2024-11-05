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

export default function Cliente() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        dniCliente: '',
        nombreCliente: '',
        telefonoCliente: '',
        fechaNacimientoCliente: '',
        apellidoCliente: ''
    });
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Función para listar clientes
    const listarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (!response.ok) throw new Error('Error al obtener los clientes');
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error(error);
        }
    };

    // Llama a listarClientes al montar el componente
    useEffect(() => {
        listarClientes();
    }, []);

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Función para crear o actualizar un cliente
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedClientId 
                ? `http://localhost:3000/api/clientes/${selectedClientId}` 
                : 'http://localhost:3000/api/clientes';
            const method = selectedClientId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                await listarClientes(); // Refresca la lista después de crear o actualizar un cliente
                setFormData({ dniCliente: '', nombreCliente: '', telefonoCliente: '', fechaNacimientoCliente: '', apellidoCliente: '' }); // Limpia el formulario
                setSelectedClientId(null); // Resetea el cliente seleccionado
                setSuccessMessage(`Cliente ${selectedClientId ? 'actualizado' : 'creado'} exitosamente!`);
                setError(''); // Limpia el mensaje de error
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.message || 'Error en los datos enviados.');
                setSuccessMessage(''); // Limpia el mensaje de éxito
            }
        } catch (error) {
            console.error(error);
            setError('Error en la solicitud');
        }
    };

    // Función para seleccionar un cliente para actualizar
    const handleEdit = (cliente) => {
        setSelectedClientId(cliente._id);
        setFormData({
            dniCliente: cliente.dniCliente,
            nombreCliente: cliente.nombreCliente,
            telefonoCliente: cliente.telefonoCliente,
            fechaNacimientoCliente: cliente.fechaNacimientoCliente.split('T')[0], // Formato de fecha YYYY-MM-DD
            apellidoCliente: cliente.apellidoCliente
        });
    };

    // Función para eliminar un cliente
    const eliminarCliente = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/clientes/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    await listarClientes(); // Refresca la lista después de eliminar un cliente
                    setSuccessMessage('Cliente eliminado exitosamente!');
                    setError(''); // Limpia el mensaje de error
                } else {
                    const errorResponse = await response.json();
                    setError(errorResponse.message || 'Error al eliminar el cliente.');
                    setSuccessMessage(''); // Limpia el mensaje de éxito
                }
            } catch (error) {
                console.error(error);
                setError('Error en la solicitud');
            }
        }
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
              {/* Formulario de Crear o Editar Cliente */}
              <h2>{selectedClientId ? 'Actualizar Cliente' : 'Crear Cliente'}</h2>
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                  type="number"
                  name="dniCliente"
                  label="DNI del Cliente"
                  value={formData.dniCliente}
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
                  name="nombreCliente"
                  label="Nombre del Cliente"
                  value={formData.nombreCliente}
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
                  name="telefonoCliente"
                  label="Teléfono del Cliente"
                  value={formData.telefonoCliente}
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
                  type="date"
                  name="fechaNacimientoCliente"
                  label="Fecha de Nacimiento"
                  value={formData.fechaNacimientoCliente}
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
                  name="apellidoCliente"
                  label="Apellido del Cliente"
                  value={formData.apellidoCliente}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{
                    '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                    '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 2, fontSize: '1.2rem' }}
                >
                  {selectedClientId ? 'Actualizar Cliente' : 'Crear Cliente'}
                </Button>
              </form>
      
              {/* Mensajes de éxito o error */}
              {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
              {/* Lista de Clientes */}
              <h1>Lista de Clientes</h1>
              <Box mt={2}>
                {clientes.map((cliente) => (
                  <Box key={cliente._id} sx={{ mb: 2 }}>
                    <p style={{ fontSize: '1.2rem' }}>
                      DNI: {cliente.dniCliente}, Nombre: {cliente.nombreCliente}, Teléfono: {cliente.telefonoCliente}, 
                      Fecha de Nacimiento: {new Date(cliente.fechaNacimientoCliente).toLocaleDateString()}, 
                      Apellido: {cliente.apellidoCliente}
                    </p>
                    <Box>
                      <IconButton onClick={() => handleEdit(cliente)} sx={{ fontSize: '1.2rem' }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => eliminarCliente(cliente._id)} sx={{ fontSize: '1.2rem' }}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Container>
          </Box>
        </Box>
      );
      
      
}
