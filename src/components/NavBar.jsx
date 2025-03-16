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
// import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Inicio', 'Buscar por nombre', 'Buscar por region', 'Buscar por idioma'];
const settings = ['Sobre mi', 'Apoya al autor',];

function NavBar() {
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

  return (
    <AppBar position="sticky" sx={{backgroundColor: 'rgba(2,0,36,1)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* /* 
            ! TITULO DE LA PAGINA PARA DISPOSITIVOS GRANDES
          */}
          <Typography variant="h6" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <a href="./" style={{outline: 'none', textDecoration: 'none', color:'#e0e1e3'}}>
              TuMundo.dev
            </a>
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
          
          {/* /* 
            ! TITULO DE LA PAGINA PARA DISPOSITIVOS MEDIANOS Y PEQUEÑOS
          */}
          <Typography variant="h5" noWrap component="a" href="#app-bar-with-responsive-menu" sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'AppWorkspace',
              textDecoration: 'none',
            }}
          >
            TuMundo.dev
          </Typography>

          {/* /* 
            ! Renderizado de la secciones del navbar en dispostivos pequeños y medianos
          */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} >
                {page}
              </Button>
            ))}

          </Box>

          {/* /* 
            ! Renderizado de la secciones para acerca del autor
          */}
          <Box sx={{ flexGrow: 0 }}>
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
          </Box>
        
          {/* /* 
            ! FIN DEL CONTENIDO DEL NAVBAR 
          */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
