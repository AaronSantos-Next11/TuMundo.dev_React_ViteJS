import { Route, Routes } from 'react-router-dom';

import HomePage from './home/HomePage'
import BuscarPorLenguaje from './search_language/BuscarPorLenguaje'
import BuscarPorNombre from './search_name/BuscarPorNombre'

import IndexZona from './search_region_subregion/IndexZona'
import BuscarPorSubregion from './search_region_subregion/BuscarPorSubregion'
import BuscarPorRegion from './search_region_subregion/BuscarPorRegion'


export default function AppRoutes() {
   return (
      <Routes>
         {/* Ruta principal */}
         <Route path='/' element={ <HomePage/> } />

         




      </Routes>
   )
}
