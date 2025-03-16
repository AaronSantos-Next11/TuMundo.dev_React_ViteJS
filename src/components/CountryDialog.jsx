import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';

// Styled Dialog component
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
  '& .MuiPaper-root': {
    minWidth: '80vw',
    maxWidth: '90vw',
    maxHeight: '90vh',
    [theme.breakpoints.down('md')]: {
      minWidth: '95vw',
    },
  }
}));

// Info Item component for consistent layout
const InfoItem = ({ icon, label, value }) => (
  <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
    {icon && (
      <Box sx={{ mr: 1, color: '#090979' }}>
        {icon}
      </Box>
    )}
    <Box>
      <Typography component="span" sx={{ fontWeight: 'bold', display: 'block' }}>
        {label}
      </Typography>
      <Typography component="span">
        {value || 'No disponible'}
      </Typography>
    </Box>
  </Box>
);

export default function CountryDialog({ open, onClose, countryData }) {
  if (!countryData) return null;

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
      scroll="paper"
    >
      <DialogTitle 
        sx={{ 
          m: 0, 
          p: 3, 
          bgcolor: '#090979', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }} 
        id="customized-dialog-title"
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PublicIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {countryData.name.common}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={4}>
          {/* Left column - Flag and coat of arms */}
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {countryData.flags && (
                <Box sx={{ mb: 3, width: '100%', textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #090979', pb: 1, color: '#090979', fontWeight: 'bold' }}>
                    Bandera Nacional
                  </Typography>
                  <img 
                    src={countryData.flags.svg || countryData.flags.png} 
                    alt={`Bandera de ${countryData.name.common}`} 
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                  />
                  {countryData.flags.alt && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, fontStyle: 'italic' }}>
                      {countryData.flags.alt}
                    </Typography>
                  )}
                </Box>
              )}
              
              {countryData.coatOfArms && (countryData.coatOfArms.svg || countryData.coatOfArms.png) && (
                <Box sx={{ mb: 2, width: '100%', textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2, borderBottom: '2px solid #090979', pb: 1, color: '#090979', fontWeight: 'bold' }}>
                    Escudo de Armas
                  </Typography>
                  <img 
                    src={countryData.coatOfArms.svg || countryData.coatOfArms.png} 
                    alt={`Escudo de armas de ${countryData.name.common}`} 
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
          
          {/* Middle column - Main information */}
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, borderBottom: '2px solid #090979', pb: 1, color: '#090979', fontWeight: 'bold' }}>
                Información General
              </Typography>
              
              <InfoItem 
                icon={<LocationOnIcon />}
                label="Nombre oficial"
                value={countryData.name.official}
              />
              
              {countryData.capital && (
                <InfoItem 
                  icon={<LocationOnIcon />}
                  label="Capital"
                  value={countryData.capital.join(', ')}
                />
              )}
              
              <InfoItem 
                icon={<PeopleIcon />}
                label="Población"
                value={`${countryData.population.toLocaleString()} habitantes`}
              />
              
              <InfoItem 
                icon={<LocationOnIcon />}
                label="Área"
                value={countryData.area ? `${countryData.area.toLocaleString()} km²` : 'No disponible'}
              />
              
              <InfoItem 
                icon={<PublicIcon />}
                label="Región"
                value={countryData.region}
              />
              
              {countryData.subregion && (
                <InfoItem 
                  icon={<PublicIcon />}
                  label="Subregión"
                  value={countryData.subregion}
                />
              )}
              
              {countryData.languages && (
                <InfoItem 
                  icon={<LanguageIcon />}
                  label="Idiomas"
                  value={Object.values(countryData.languages).join(', ')}
                />
              )}
            </Paper>
          </Grid>
          
          {/* Right column - Additional information */}
          <Grid xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 3, borderBottom: '2px solid #090979', pb: 1, color: '#090979', fontWeight: 'bold' }}>
                Detalles Adicionales
              </Typography>
              
              {countryData.currencies && (
                <InfoItem 
                  icon={<AttachMoneyIcon />}
                  label="Monedas"
                  value={Object.values(countryData.currencies)
                    .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
                    .join(', ')}
                />
              )}
              
              {countryData.timezones && (
                <InfoItem 
                  icon={<AccessTimeIcon />}
                  label="Zonas horarias"
                  value={countryData.timezones.join(', ')}
                />
              )}
              
              {countryData.continents && (
                <InfoItem 
                  icon={<PublicIcon />}
                  label="Continente"
                  value={countryData.continents.join(', ')}
                />
              )}
              
              {countryData.borders && (
                <InfoItem 
                  icon={<LocationOnIcon />}
                  label="Países limítrofes"
                  value={countryData.borders.join(', ')}
                />
              )}
              
              {countryData.car && countryData.car.side && (
                <InfoItem 
                  label="Lado de conducción"
                  value={countryData.car.side === 'right' ? 'Derecha' : 'Izquierda'}
                />
              )}
              
              {countryData.tld && (
                <InfoItem 
                  label="Dominios de Internet"
                  value={countryData.tld.join(', ')}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ bgcolor: '#f5f5f5' }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ 
            bgcolor: '#090979',
            '&:hover': {
              bgcolor: '#070757',
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}