import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CategoriaUsuario() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categorias');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

    /*// Función para manejar la redirección al hacer clic en una categoría
    const handleCategoriaClick = async (categoriaId) => {
    try {
        // Navega a una nueva ruta pasando el ID de la categoría
        navigate(`/productos-usuario?categoria=${categoriaId}`);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
    };*/

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
        <Container maxWidth="lg" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
          <Typography variant="h3" align="center" gutterBottom>
            Categorías de Productos
          </Typography>
          <Grid container spacing={4}>
            {categorias.map((categoria) => (
              <Grid item key={categoria._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    borderRadius: '20px',
                  }}
                  onClick={() => handleCategoriaClick(categoria)}
                >
                  <CardMedia
                    component="img"
                    alt={categoria.nombreCategoria}
                    height="350"
                    image={categoria.imagen || 'default_image_url.jpg'}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {categoria.nombreCategoria}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {categoria.descripcionCategoria}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
