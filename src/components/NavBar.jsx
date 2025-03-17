import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { Link, useNavigate } from 'react-router-dom';

// Define las páginas con sus nombres y rutas correspondientes
const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Buscar por nombre', path: '/buscar_por_nombre' },
  { name: 'Buscar por region', path: '/buscar_por_region_subregion' },
  { name: 'Buscar por idioma', path: '/buscar_por_lenguaje' }
];
// const settings = ['Sobre mi', 'Apoya al autor'];

function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="sticky" sx={{backgroundColor: 'rgba(2,0,36,1)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* /* 
            ! TITULO DE LA PAGINA PARA DISPOSITIVOS GRANDES
          */}
          <Typography variant="h6" noWrap component="div" sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{outline: 'none', textDecoration: 'none', color:'#e0e1e3'}}>
              TuMundo.dev
            </Link>
          </Typography>

          {/* /* 
            ! Renderizado de la secciones del navbar
          */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" 
              aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit" >

              <MenuIcon />

            </IconButton>

            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
              keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigation(page.path)}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
          
          {/* /* 
            ! TITULO DE LA PAGINA PARA DISPOSITIVOS MEDIANOS Y PEQUEÑOS
          */}
          <Typography variant="h5" noWrap component="div" sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'AppWorkspace',
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{outline: 'none', textDecoration: 'none', color:'#e0e1e3'}}>
              TuMundo.dev
            </Link>
          </Typography>

          {/* /* 
            ! Renderizado de la secciones del navbar en dispostivos pequeños y medianos
          */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
              <Button 
                key={page.name} 
                onClick={() => handleNavigation(page.path)} 
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}

          </Box>

          {/* /* 
            ! Renderizado de la secciones para acerca del autor
          */}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Acerca del autor">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="N" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        
          {/* /* 
            ! FIN DEL CONTENIDO DEL NAVBAR 
          */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;