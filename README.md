# 🗺️ Bienvenido a la documentación oficial de TuMundo.dev 

TuMundo.dev esta desarrollada con:

* [React v19](https://react.dev/)
* [Vite.js v6.2.0](https://vite.dev/)
* [React Router Dom v7.3.0](https://www.npmjs.com/package/react-router-dom)
* [Material UI v6.4.7](https://mui.com/material-ui/getting-started/)

Junto con algunas herramientas y plataformas como:

* [Postman](https://www.postman.com/)
* [HTTPie](https://httpie.io/)
* [NPM](https://www.npmjs.com/)
* [Node.js](https://nodejs.org)
* [Git](https://git-scm.com/)
* [GitHub](https://github.com/home)
* [Vercel](https://vercel.com/home)

## Introducción
Este proyecto es una implementación visual de la API [REST Country](https://restcountries.com/). Como un proyecto universitario que permite aplicar lo aprendido en las clases de *Aplicaciones web orientadas a servicios*.
Agradecimientos especiales al Senior Java Software Engineer: Alejandro Matos García.
Quien es el creador de la propia API. Por favor, si tienes la opotunidad, apoyalo  por medio de [PayPal](https://www.paypal.com/paypalme/amatosg/15) y [Patreon](https://www.patreon.com/amatos)

## ⚙️ Estructura del proyecto

El proyecto se compone 3 carpetas dentro de **src** las cuales son: **app**, **assets** y **components**

1. `/app` (secciones de la app): Se compone de 4 sub-carpetas y un archivo de rutas *AppRoutes.jsx* que gestiona a donde redirigen los links y botones que tiene el NavBar y Footer.

   * `/home`:

      * **HomaPage.jsx**

   * `/search_language`:

      * **BuscarPorLenguaje**

   * `/search_name`: 
      *  **BuscarPorNombre**

   * `/search_region_subregion`:

      * **IndexZona**
      * **BuscarPorSubregion**
      * **BuscarPorRegion**

2. `/assets` (iconos usados): Iconos usados durante el proyecto, dentro del componente **app**.

   * `/icons`:

      * **TuMundoLogo.png**
      * **vercel.svg** 

3. `/components` (componentes usados en **app**):

   * **button.css**
   * **Button.jsx**
   * **CountryDialog.jsx**
   * **Footer.jsx**
   * **NavBar.jsx**
   * **theme.jsx**

## 🚀 Funcionalidades 

- Muestra en la pagina de *Inicio*, algunas cards de paises que tienen la función de mostrar la información interesante.
- Sección de busqueda de pais por nombre (en cualquier idioma que no se español o ingles)
- Sección de busqueda por región (continente) y subregiones
- Busqueda de paises por medio del idioma que hablan


## Clona este repositorio

Si quieres clonar el proyecto hazlo por medio de SSH, y si no por HTTPS (que es lo preferible para la mayoria):

````sh
https://github.com/AaronSantos-Next11/TuMundo.dev_React_ViteJS.git
````