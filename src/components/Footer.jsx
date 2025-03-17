import React from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography, Container, Link, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import vercelLogo from '../assets/icons/vercel.svg';


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'rgba(0, 0, 36, 0.9)',
        color: '#e0e1e3',
        py: 6,
        borderTop: '1px solid rgba(224, 225, 227, 0.2)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Sobre TuMundo.dev
            </Typography>
            <Typography variant="body2" >
              La plataforma más completa de información sobre países del mundo. 
              Explore datos demográficos, banderas, capitales y mucho más.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid  xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontFamily:'Railway' }}>
              Enlaces Útiles
            </Typography>

              <Link href="." color="inherit" sx={{ display: 'block', mb: 1 }}>
                Buscar Países por nombre
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Buscar Países por Continentes
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Buscar Países por subregiones
              </Link>
              <Link href="" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Buscar Países por su idioma
              </Link>

              <a href="https://restcountries.com/" color="inherit" sx={{ display: 'block', mb: 1, FormatUnderlined:'' }}>
                API Documentación
              </a>

          </Grid>

          {/* Contact Section */}
          <Grid xs={12} md={4}  >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">
                info@tumundo.dev
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">
                +34 612 345 678
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: '1rem' }} />
              <Typography variant="body2">
                México
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(224, 225, 227, 0.2)', my: 4 }} />

        {/* Copyright Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {currentYear} TuMundo.dev. Todos los derechos reservados.
          </Typography>
          {/* <Typography variant="body2">
            Alojado en Vercel <img style={{width:'15px', color: 'white', alignContent: 'center'}} src="../public/vercel.svg" alt="Vercel log" />
          </Typography> */}
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'rgba(224, 225, 227, 0.7)' }}>
            Desarrollado con <span style={{ color: '#e91e63' }}>♥</span> por Next11 | Alojado en Vercel 
            <img style={{
              width:'15px', color: 'white', alignContent: 'center',
              marginLeft: 4, marginBottom: -3,
            }} 
              src={vercelLogo} alt="Vercel logo" />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;