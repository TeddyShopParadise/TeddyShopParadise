import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <div>
            <List>
                {['Home', 'MasInformacion'].map((text) => (
                    <ListItem button component={RouterLink} to={`/${text.toLowerCase()}`} key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="fixed" sx={{ backgroundColor: '#007832' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                        component="img"
                        sx={{
                            height: 40,
                            marginRight: 2,
                        }}
                        /*src={imagen}
                        alt="ejemplo"*/
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        TeddyShop
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {['Home', 'MasInformacion'].map((text) => (
                            <Typography
                                key={text}
                                sx={{ margin: 1, color: 'white', textDecoration: 'none' }}
                                component={RouterLink}
                                to={`/${text.toLowerCase()}`}
                            >
                                {text}
                            </Typography>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                {drawer}
            </Drawer>
        </div>
    );
}
