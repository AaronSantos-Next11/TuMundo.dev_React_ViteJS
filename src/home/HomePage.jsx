import React from 'react';
import Typography from '@mui/material/Typography';
import NavBar from '../components/NavBar';
import Box from '@mui/material/Box';

export default function HomePage() {

  // useState de los datos de cada pais:
  // const [datos, setDatos] = React.useState(
  //   { country: [] } 
  // )

  //? useState de los 3 paises a destacar
  const [paisDatos, setPaisDatos] = React.useState({ country: [] }) // Aqui se guardarán TODOS los datos de cada pais, muy útil para props

  //! Los 3 paises destacados:
  const paisesDesatacados = ["alemania", "mexico", "noruega"]

  //! Llamar la API de paises por nombre (en cualquier idioma)
  const obtenerDatosPaisesNombre = async() => {

    const paisDestacar = paisDatos.trim() // Intancia de la variable de los paises

    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    try {

      const response = await fetch(`https://restcountries.com/v3.1/translation/${paisDestacar}`, requestOptions);
      const result = await response.text();
      setPaisDatos(result);
      console.log(result);

    } catch (error) {
      console.error(error);
    };
  }

  const fontsize_h1 = {
    xs: '1.5rem', // Tamaño para pantallas pequeñas
    sm: '2rem',
    md: '2.5rem',
    lg: '4rem'
  }
  const fontsize_eslogan = {
    xs: '0.2rem', // Tamaño para pantallas pequeñas
    sm: '0.5rem',
    md: '0.9rem',
    lg: '1.1rem'
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, rgba(2,0,36,1) 14%, rgba(9,9,121,1) 50%, rgba(0,146,255,1) 100%)' }}>
      
      {/* Llamada del navbar */}
      <NavBar />

      {/* ---------------------- HERO SECTION ---------------------- */}

      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

          {/* Titulo de la pagina */}
          <Typography variant="h2" color="#e0e1e3" align="center" 
          fontSize={fontsize_h1}
          position="relative" margin={3} marginBottom={0}>
            Bienvenido a TuMundo.dev
          </Typography>

          {/* Eslogan de la pagina */}
          <Typography variant="h6" color="#e0e1e3" fontSize={fontsize_eslogan} align="center" margin={3}>
            La página con la mayor recopilación de datos de cada país del planeta!
          </Typography>
      </Box>

      {/* ---------------------- Sección de "Destacados" ---------------------- */}


    </div>
  );
}
