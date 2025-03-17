import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Card, 
  CardContent, 
  CardMedia 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import ExploreIcon from '@mui/icons-material/Explore';

export default function IndexZona() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(2,0,36,1) 14%, rgba(9,9,121,1) 50%, rgba(0,146,255,1) 100%)', }}>
      <Container maxWidth="lg">
        <Box sx={{ py: '8vh', textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom color='#e0e1e3'>
            Busca países por región o subregión
          </Typography>

          <Typography variant="body1" component="p" color='#e0e1e3' elevation={3} sx={{ p: 3, mt: 4, mb: 6 }}>
            Utiliza nuestras herramientas de búsqueda para encontrar información detallada sobre países 
            de todo el mundo. Puedes buscar por región o subregión para descubrir datos demográficos, 
            banderas, idiomas y más.
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card raised sx={{ height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.light',
                    color: 'white'
                  }}
                >
                  <PublicIcon fontSize="large" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Buscar por Región
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Explora países agrupados por continentes o grandes regiones geográficas como África, 
                    América, Asia, Europa y Oceanía.
                  </Typography>
                  <Button 
                    component={Link} 
                    to="buscar_por_region" 
                    variant="contained" 
                    startIcon={<ExploreIcon />}
                    fullWidth
                  >
                    Buscar por Región
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card raised sx={{ height: '100%' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'secondary.light',
                    color: 'white'
                  }}
                >
                  <LanguageIcon fontSize="large" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Buscar por Subregión
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Refina tu búsqueda explorando subregiones específicas como Europa del Norte, 
                    Sudamérica, África Oriental y más.
                  </Typography>
                  <Button 
                    component={Link} 
                    to="buscar_por_subregion" 
                    variant="contained" 
                    color="secondary"
                    startIcon={<ExploreIcon />}
                    fullWidth
                  >
                    Buscar por Subregión
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}