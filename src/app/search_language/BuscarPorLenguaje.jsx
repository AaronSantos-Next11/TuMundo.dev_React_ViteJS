import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress, 
  Card, 
  CardContent, 
  Grid, 
  Alert, 
  Paper,
  Container,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import CountryDialog from '../../components/CountryDialog';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import TranslateIcon from '@mui/icons-material/Translate';

export default function BuscarPorLenguaje() {
  // States
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [languagesLoading, setLanguagesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Common languages to populate the dropdown initially
  const commonLanguages = [
    { code: 'spanish', name: 'Español' },
    { code: 'english', name: 'Inglés' },
    { code: 'french', name: 'Francés' },
    { code: 'portuguese', name: 'Portugués' },
    { code: 'arabic', name: 'Árabe' },
    { code: 'chinese', name: 'Chino' },
    { code: 'russian', name: 'Ruso' },
    { code: 'german', name: 'Alemán' },
    { code: 'japanese', name: 'Japonés' },
    { code: 'italian', name: 'Italiano' }
  ];

  // Load languages on component mount
  useEffect(() => {
    setAvailableLanguages(commonLanguages);
    setLanguagesLoading(false);
  }, []);

  // Handle language selection change
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    if (error) setError(null);
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!selectedLanguage) {
      setError('Por favor, selecciona un idioma');
      return;
    }

    setLoading(true);
    setError(null);
    setCountries([]);

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {
      const response = await fetch(`https://restcountries.com/v3.1/lang/${encodeURIComponent(selectedLanguage)}`, requestOptions);
      
      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.status}`);
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

  // Get language name from code
  const getLanguageName = (code) => {
    const language = commonLanguages.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(2,0,36,1) 14%, rgba(9,9,121,1) 50%, rgba(0,146,255,1) 100%)',}}>
      <Container maxWidth="lg" sx={{ py: '15rem' }}>
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
            <TranslateIcon sx={{ mr: 1, fontSize: 35, verticalAlign: 'middle' }} />
            Buscar países por idioma
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
            <FormControl fullWidth>
              <InputLabel id="language-select-label">Seleccionar idioma</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedLanguage}
                label="Seleccionar idioma"
                onChange={handleLanguageChange}
                disabled={languagesLoading}
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageIcon color="action" />
                  </InputAdornment>
                }
              >
                {availableLanguages.map((language) => (
                  <MenuItem key={language.code} value={language.code}>
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={loading || !selectedLanguage}
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

          {countries.length > 0 && (
            <>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Typography variant="h6" color="#090979">
                  Se encontraron {countries.length} países donde se habla {getLanguageName(selectedLanguage)}:
                </Typography>
                <Chip 
                  icon={<TranslateIcon />} 
                  label={`Idioma: ${getLanguageName(selectedLanguage)}`} 
                  color="primary" 
                  sx={{ bgcolor: '#090979', mt: { xs: 2, md: 0 } }}
                />
              </Box>
              
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