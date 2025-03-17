import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Card, 
  CardContent,
  CardMedia,
  CardActions,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CountryDialog from '../../components/CountryDialog';

export default function BuscarPorRegion() {
  const [region, setRegion] = useState('');
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const regiones = [
    'Africa', 
    'Americas', 
    'Asia', 
    'Europe', 
    'Oceania'
  ];

  // Definición de tamaños responsivos para el input
  const sizeInput = {
    xs: '10rem', // Ancho completo en móviles muy pequeños
    sm: '20rem', // Ancho completo en móviles
    md: '25rem', // Ancho completo en tablets (el Grid ya maneja la división)
    lg: '30rem'  // Ancho completo en desktop (el Grid ya maneja la división)
  };

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  const buscarPorRegion = async () => {
    if (!region) return;
    
    setLoading(true);
    setError(null);
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Error al buscar países: ${response.status}`);
      }
      
      const data = await response.json();
      setPaises(data);
    } catch (error) {
      console.error(error);
      setError(`Error al buscar países: ${error.message}`);
      setPaises([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (country) => {
    setSelectedCountry(country);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(2,0,36,1) 14%, rgba(9,9,121,1) 50%, rgba(0,146,255,1) 100%)', }}>
      <Container maxWidth="lg">
        <Box sx={{ py: '19vh' }}>
          <Button 
            component={Link} 
            to="/buscar_por_region_subregion" 
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Volver
          </Button>
          
          <Typography variant="h4" component="h1" gutterBottom color='#e0e1e3'>
            Buscar Países por Región
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="region-select-label">Región</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    value={region}
                    label="Región"
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 48 * 4.5,
                          width: 'auto'
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.87)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                      bgcolor: 'background.paper',
                      display: 'flex',
                      minHeight: '56px',
                      width: {
                        xs: sizeInput.xs,
                        sm: sizeInput.sm,
                        md: sizeInput.md,
                        lg: sizeInput.lg
                      }
                    }}
                  >
                    {regiones.map((reg) => (
                      <MenuItem key={reg} value={reg}>{reg}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button 
                  variant="contained" 
                  onClick={buscarPorRegion}
                  startIcon={<SearchIcon />}
                  disabled={!region || loading}
                  fullWidth
                  sx={{ height: '56px' }}  // Igualar altura con el select
                >
                  {loading ? <CircularProgress size={24} /> : 'Buscar'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
          )}
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {paises.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom color='#e0e1e3'>
                    Resultados para la región: {region}
                  </Typography>
                  <Typography variant="body2" color='#e0e1e3'>
                    Se encontraron {paises.length} países
                  </Typography>
                </Box>
              )}
              
              <Grid container spacing={3}>
                {paises.map((pais) => (
                  <Grid item key={pais.cca3} xs={12} sm={6} md={4}>
                    <Card raised sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={pais.flags.png}
                        alt={pais.flags.alt || `Bandera de ${pais.name.common}`}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {pais.name.common}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Capital:</strong> {pais.capital ? pais.capital.join(', ') : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Población:</strong> {pais.population.toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<InfoOutlinedIcon />}
                          onClick={() => handleOpenDialog(pais)}
                        >
                          Ver Detalles
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Dialog para mostrar detalles del país */}
              <CountryDialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                countryData={selectedCountry} 
              />
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}