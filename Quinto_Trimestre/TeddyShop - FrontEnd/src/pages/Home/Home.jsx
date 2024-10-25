import React from 'react';
import { Container, Typography, Box, TextField, Button} from '@mui/material';
import logoTeddyShop from '../../assets/img/LogoTeddyShop.jpg';

const Home = () => {
    return (
        <Container disableGutters sx={{ maxWidth: '100vw', padding: 0, margin: 0 }}>
            {/* Sección de bienvenida */}
            <Box 
                sx={{ 
                    backgroundColor: '#FFF0F5', 
                    height: '90vh', 
                    width: '100vw', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center', 
                    margin: -1,  
                    padding: 0 
                }}
            >
                <Box sx={{
                    width: '80%', maxWidth: '600px', padding: '50px',
                    backgroundColor: '#FFB6C1', borderRadius: '50px'
                }}>
                    <img src={logoTeddyShop} alt="Peluches.oso Logo" style={{ width: '250px', height: '250px', marginBottom: '20px' }} />
                    <Typography variant="h1" sx={{ fontSize: '3rem', color: '#2f2f2f' }}>
                        PELUCHES.OSO
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'black' }}>
                        ¡Bienvenidos a Peluches.oso! Encuentra el compañero de peluche perfecto para todas las edades.
                    </Typography>
                    <ul style={{
                        display: 'flex', flexDirection: 'column', color: 'black',
                        justifyContent: 'space-evenly', padding: 0, listStyle: 'none', marginTop: '20px'
                    }}>
                        <li>Suaves y abrazables</li>
                        <li>Variedad de tamaños, colores y estilos</li>
                        <li>Materiales de alta calidad y seguros para niños</li>
                        <li>Más que solo juguetes, son amigos para toda la vida</li>
                    </ul>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                        ¡Que esperas para ordenar tu peluche! ¡Te esperamos en Peluches.oso!
                    </Typography>
                </Box>
            </Box>

            


            {/* Sección de ubicación */}
            <Box 
                sx={{ 
                    height: '70vh', 
                    width: '100vw', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center', 
                    margin: 0,  
                    padding: 0 
                }}
            >
                <Box sx={{
                    width: '80%', maxWidth: '600px', padding: '50px',
                    backgroundColor: '#FFB6C1', borderRadius: '50px'
                }}>
                    <Typography variant="h2" sx={{ color: '#2f2f2f', fontSize: '3rem', marginBottom: '20px' }}>
                        NOS UBICAMOS EN
                    </Typography>
                    <iframe
                        title="Ubicación Peluches.oso"
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5624.3892489766695!2d-74.19486199590521!3d4.586165152583506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMzUnMjYuMSJOIDc0wrAxMSczNy4zIlc!5e0!3m2!1ses-419!2sco!4v1719348345914!5m2!1ses-419!2sco"
                        style={{ width: '100%', height: '400px', border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
