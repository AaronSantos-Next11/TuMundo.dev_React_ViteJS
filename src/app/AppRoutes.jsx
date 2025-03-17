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

         {/* Ruta para buscar por nombre */}
         <Route path='/buscar_por_nombre' element={ <BuscarPorNombre/> } />

         {/* Ruta para buscar por lenguje */}
         <Route path='/buscar_por_lenguaje' element={ <BuscarPorLenguaje/> } />

         {/* Ruta para buscar por region y subregion */}
         <Route path='/buscar_por_region_subregion' >

            <Route index element={ <IndexZona/> } />

            <Route path='buscar_por_region' element={ <BuscarPorRegion/> } />

            <Route path='buscar_por_subregion' element={ <BuscarPorSubregion/> } />

            <Route />

         </Route>

      </Routes>
   )
}
