import React from 'react';
import './Footer.css';
import { Container, Typography, Box, Grid } from '@mui/material';


const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
            <footer>
        <Box 
            sx={{ 
                backgroundColor: '#503486', 
                height: '10vh', 
                width: '95vw', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center', 
                margin: -1,  
                padding: '50px'
            }}
        >
                <Grid container spacing={2}>
                    {/* Sección de Información de la empresa */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h3" sx={{ color: '#48e' }}>
                            Sobre Peluches.oso
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.6, color:'white'}}>
                            Peluches.oso es una empresa especializada en la fabricación y venta de peluches de alta calidad. Nos enorgullecemos de ofrecer peluches suaves, duraderos y seguros para todas las edades.
                        </Typography>
                    </Grid>

                    {/* Sección de contacto */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h3" sx={{ color: '#48e' }}>
                            Contáctanos
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'white' }}>
                            <li><a href="https://www.instagram.com/peluches.oso/?utm_medium=copy_link&hl=es" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Peluches.oso</a></li>
                            <li><a href="tel:+573222456505" style={{ color: 'white' }}>3103221166</a></li>
                            <li><a href="tel:+573058780398" style={{ color: 'white' }}>3058780398</a></li>
                            <li>Bogotá, Colombia</li>
                        </ul>
                    </Grid>

                    {/* Sección de enlaces rápidos */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h3" sx={{ color: '#48e' }}>
                            Enlaces rápidos
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Inicio</a></li>
                            <li><a href="/Devoluciones" style={{ color: 'white', textDecoration: 'none' }}>Devoluciones</a></li>
                            <li><a href="/Catalogos" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</a></li>
                        </ul>
                    </Grid>
                    <Grid>
                    <p style={{ textAlign: 'center', color: 'white'}}>© {currentYear} TeddyShop. All rights reserver</p>
                    </Grid>
                </Grid>
            </Box>
            
        </footer>
    );
};

export default Footer;