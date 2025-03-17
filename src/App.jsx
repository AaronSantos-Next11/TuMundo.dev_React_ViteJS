import Home from './app/home/HomePage'
import AppRoutes from './app/AppRoutes'
import Footer from './components/Footer';
import NavBar from './components/NavBar';

export default function App() {

  return (
    <div>
      <NavBar/>
      <AppRoutes />
      <Footer />
    </div>
  )
}