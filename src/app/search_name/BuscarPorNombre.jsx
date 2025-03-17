import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  Card, 
  CardContent, 
  Alert, 
  Paper,
  Container,
  InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import CountryDialog from '../../components/CountryDialog'; // Importing the dialog component
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

export default function BuscarPorNombre() {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Reset error state when input changes
    if (error) setError(null);
    if (noResults) setNoResults(false);
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError('Por favor, ingresa el nombre de un país');
      return;
    }

    setLoading(true);
    setError(null);
    setNoResults(false);
    setCountries([]);

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {
      // Using translation endpoint to search for countries in any language
      const response = await fetch(`https://restcountries.com/v3.1/translation/${encodeURIComponent(searchTerm)}`, requestOptions);
      
      if (!response.ok) {
        if (response.status === 404) {
          setNoResults(true);
        } else {
          throw new Error(`Error en la búsqueda: ${response.status}`);
        }
        setLoading(false);
        return;
      }
      
      const result = await response.json();
      setCountries(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(`Error al buscar países: ${error.message}`);
      setLoading(false);
    }
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(2,0,36,1) 14%, rgba(9,9,121,1) 50%, rgba(0,146,255,1) 100%)', }}>

    <Container maxWidth="lg" sx={{ py: '19vh' }} >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          backgroundImage: 'linear-gradient(to bottom, #f5f7fa, #e4e7eb)',
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          color="#090979" 
          fontWeight="bold" 
          textAlign="center" 
          gutterBottom
          sx={{ mb: 4 }}
        >
          <PublicIcon sx={{ mr: 1, fontSize: 35, verticalAlign: 'middle' }} />
          Buscar país por nombre
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSearch} 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2,
            mb: 4,
            maxWidth: 'md',
            mx: 'auto'
          }}
        >
          <TextField
            fullWidth
            label="Nombre del país"
            variant="outlined"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Ej: España, United States, Deutschland, 日本"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            sx={{ 
              bgcolor: '#090979',
              '&:hover': { bgcolor: '#070757' },
              px: 4,
              minWidth: { xs: '100%', sm: 'auto' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
        )}

        {noResults && (
          <Alert severity="info" sx={{ mb: 4 }}>
            No se encontraron países que coincidan con "{searchTerm}". Intenta con otro nombre o verifica la ortografía.
          </Alert>
        )}

        {countries.length > 0 && (
          <>
            <Typography variant="h6" color="#090979" sx={{ mb: 2 }}>
              Se encontraron {countries.length} resultados:
            </Typography>
            
            <Grid container spacing={3}>
              {countries.map((country, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                      }
                    }}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <CardContent>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        {country.flags && (
                          <img 
                            src={country.flags.png} 
                            alt={`Bandera de ${country.name.common}`} 
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px' }}
                          />
                        )}
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: '#090979',
                          textAlign: 'center',
                          mb: 2
                        }}
                      >
                        {country.name.common}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 1, color: '#090979' }} />
                        <Typography variant="body2">
                          <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PeopleIcon fontSize="small" sx={{ mr: 1, color: '#090979' }} />
                        <Typography variant="body2">
                          <strong>Población:</strong> {country.population.toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PublicIcon fontSize="small" sx={{ mr: 1, color: '#090979' }} />
                        <Typography variant="body2">
                          <strong>Región:</strong> {country.region}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>

      {/* Country Detail Dialog */}
      {selectedCountry && (
        <CountryDialog 
          open={dialogOpen}
          onClose={handleDialogClose}
          countryData={selectedCountry}
        />
      )}
    </Container>
  </div>
  );
}