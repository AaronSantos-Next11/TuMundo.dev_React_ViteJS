import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField,
  Button, 
  Card, 
  CardContent, 
  CardMedia,
  CardActions,
  CircularProgress,
  Alert,
  Paper,
  Autocomplete
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import CountryDialog from '../../components/CountryDialog';

export default function BuscarPorSubregion() {
  const [subregion, setSubregion] = useState('');
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todasSubregiones, setTodasSubregiones] = useState([]);
  const [loadingSubregiones, setLoadingSubregiones] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Obtener todas las subregiones disponibles al cargar el componente
  useEffect(() => {
    const obtenerSubregiones = async () => {
      setLoadingSubregiones(true);
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) {
          throw new Error(`Error al obtener datos: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extraer subregiones únicas
        const subregionesUnicas = [...new Set(
          data
            .filter(pais => pais.subregion)
            .map(pais => pais.subregion)
        )].sort();
        
        setTodasSubregiones(subregionesUnicas);
      } catch (error) {
        console.error('Error al obtener subregiones:', error);
      } finally {
        setLoadingSubregiones(false);
      }
    };
    
    obtenerSubregiones();
  }, []);

  const handleChange = (event, value) => {
    setSubregion(value);
  };

  const buscarPorSubregion = async () => {
    if (!subregion) return;
    
    setLoading(true);
    setError(null);
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {
      // Reemplazar espacios por %20 para la URL
      const subregionEncoded = encodeURIComponent(subregion);
      const response = await fetch(`https://restcountries.com/v3.1/subregion/${subregionEncoded}`, requestOptions);
      
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
            Buscar Países por Subregión
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="subregion-select"
                  options={todasSubregiones}
                  loading={loadingSubregiones}
                  value={subregion}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subregión"
                      helperText="Selecciona una subregión del mundo"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingSubregiones ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={buscarPorSubregion}
                  startIcon={<SearchIcon />}
                  disabled={!subregion || loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={24} /> : 'Buscar'}
                </Button>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <InfoIcon color="info" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Ejemplos: Northern Europe, South America, Western Africa, Southeast Asia
              </Typography>
            </Box>
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
                    Resultados para la subregión: {subregion}
                  </Typography>
                  <Typography variant="body2" color='#e0e1e3' >
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