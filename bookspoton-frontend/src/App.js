
import './App.css';
import Navbar from './Components/Navbar';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import { UserProvider } from './Components/Userinfo/UserContext';
import MoviesPage from './pages/MoviesPage';
import CarouselPage from './Components/Carousel/CarouselPage';
import EventsData from './Components/Carousel/EventsData';
import BookMoviePage from './pages/BookMoviePage';
import PaymentModel from './Components/PaymentModel/PaymentModel';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <CarouselPage />
        <EventsData />
        <Footer/>
        <Routes>
          <Route path="/signin" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/buytickets" element={<BookMoviePage />} />
          <Route path="/payment" element={<PaymentModel />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
