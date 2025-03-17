import React from 'react';
import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Card, Paper, CircularProgress } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CardActionArea from '@mui/material/CardActionArea';

// import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
// import Footer from '../../components/Footer';
import CountryDialog from '../../components/CountryDialog';

export default function HomePage() {

  //? useState de los 3 paises a destacar y el estado de loading
  const [paisesData, setPaisesData] = useState({}); // Corregido: nombre de variable
  const [loading, setLoading] = useState(true);

  //? useState al seleccionar una carta:
  const [selectedCard, setSelectedCard] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  //! Los 3 paises destacados:
  const paisesDestacados = ["colombia", "mexico", "norway", "france", "finland", "chile", "italy", "south korea"];

  //! Llamar la API de paises por nombre (en cualquier idioma)
  const obtenerDatosPaisesNombre = async(nombrePais) => { // Corregido: añadido parámetro nombrePais

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${nombrePais}`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Error fetching data for ${nombrePais}`);
      }
      
      const result = await response.json();
      return result[0]; // Return the first match
    } catch (error) {
      console.error(`Error fetching data for ${nombrePais}:`, error);
      return null;
    }
  };

  //! Fetch data for all featured countries on component mount
  useEffect(() => {
    const fetchAllCountries = async () => {
      setLoading(true);
      const results = {};
      
      for (const pais of paisesDestacados) {
        const data = await obtenerDatosPaisesNombre(pais);
        if (data) {
          results[pais] = data;
        }
      }
      
      setPaisesData(results);
      setLoading(false);
    };
    
    fetchAllCountries();
  }, []);

  //! Handle card click 
  const handleCardClick = (index) => {
    setSelectedCard(index);
    setDialogOpen(true);
  };

  //! Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  //! Constantes para el cambio de tamaño de titulos y eslogan:
  const fontsize_h1 = {
    xs: '1.9rem', // Tamaño para pantallas pequeñas
    sm: '2.8rem',
    md: '3.5rem',
    lg: '4rem'
  }

  const fontsize_h2 = {
    xs: '1.3rem', // Tamaño para pantallas pequeñas
    sm: '1.4rem',
    md: '1.7rem',
    lg: '2.1rem'
  }

  const fontsize_eslogan = {
    xs: '1rem', // Tamaño para pantallas pequeñas
    sm: '1.1rem',
    md: '1.1rem',
    lg: '1.1rem'
  }

  //! Renderizado del cliente: 
  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(2,0,36,1) 14%, rgba(9,9,121,1) 50%, rgba(0,146,255,1) 100%)', }}>

      {/* ---------------------- HERO SECTION ---------------------- */}

      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '10em'}}>

          {/* Titulo de la pagina */}
          <Typography variant="h2" color="#e0e1e3" sx={{textShadow:'2px 1px 6px #e0e1e3'}}
          align="center" fontSize={fontsize_h1}
          position="relative" padding={4} paddingTop={20} marginBottom={0}>
            Bienvenido a TuMundo.dev
          </Typography>

          {/* Eslogan de la pagina */}
          <Typography variant="h6" color="#e0e1e3" fontSize={fontsize_eslogan} align="center" margin={3}>
            La página con la mayor recopilación de datos de cada país del planeta.
          </Typography>

          <Button /> {/* Boton que lleva a la sección de busqueda de paises */}

          <KeyboardDoubleArrowDownIcon 
          fontSize="large" 
          sx={{
            display:'flex', alignSelf:'center', color: '#e0e1e3',
            marginTop: '3% ', marginBottom:'3%',
            }} />
      </Box>

      {/* ---------------------- Sección de "Destacados" ---------------------- */}
      
      <Typography variant="h4" fontSize={fontsize_h2} color="#e0e1e3" align="center" margin={3} >
        Países Destacados
      </Typography>
      
      {/* /* 
      !  Ternaria que devuelve una carta vacia si no hay datos del pais, y sino la card con información
       */}
       
      <Grid container spacing={4} sx={{ padding: 7, justifyContent: 'center' }}>
        { loading ? (
          <CircularProgress sx={{ color: 'white' }} />
        ) : (
          paisesDestacados.map((paisNombre, index) => {
            const datosPais = paisesData[paisNombre];
            
            if (!datosPais) {
              return (
                <Grid xs={12} sm={6} md={4} key={index}> {/* Corregido: item se eliminó ya que Grid2 no usa item */}
                  <Card variant="outlined">
                    <Paper style={{ padding: 20, textAlign: 'center' }}>
                      <Typography variant="h6">
                        No se encontraron datos para {paisNombre}
                      </Typography>
                    </Paper>
                  </Card>
                </Grid>
              );
            }
            
            {/* /* 
              ! En caso de que si se encuentre la info del pais */}
            return ( 
              <Grid xs={12} sm={6} md={4} key={index}> 
                <Card variant="outlined" 
                  sx={{ 
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleCardClick(index)}
                    sx={{ height: '100%' }}
                  >
                  <Paper style={{ padding: 20 }}>

                    {datosPais.flags && (
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <img 
                          src={datosPais.flags.png} 
                          alt={`Bandera de ${datosPais.name.common}`} 
                          style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }}
                        />
                      </Box>
                    )}
                    
                    <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color:'#090979' }} >
                      {datosPais.name.common}
                    </Typography>
                    
                    <Typography sx={{mb: 1}}>
                      <span style={{fontWeight: 'bold'}} > Nombre oficial:</span> {datosPais.name.official}
                    </Typography>
                    
                    {datosPais.capital && (
                      <Typography sx={{ mb: 1 }} >
                        <span style={{fontWeight: 'bold'}} >Capital:</span> {datosPais.capital[0]}
                      </Typography>
                    )}
                    
                    <Typography sx={{ mb: 1 }} >
                      <span style={{fontWeight: 'bold'}} > Población:</span> {datosPais.population.toLocaleString()} 
                    </Typography>
                    
                    <Typography sx={{ mb: 1 }} >
                      <span style={{fontWeight: 'bold'}} >Región:</span> {datosPais.region}
                    </Typography>

                  </Paper>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* /* 
      !  Sección que cambia en base al pais que seleccione el usuario y muestra mas información del mismo pais
       */}
        
      {!loading && selectedCard !== null && dialogOpen && (
        <CountryDialog 
          open={dialogOpen}
          onClose={handleDialogClose}
          countryData={paisesData[paisesDestacados[selectedCard]]}
        />
      )}

    </div>
  );
}