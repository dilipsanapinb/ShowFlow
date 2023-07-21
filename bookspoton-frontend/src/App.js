
import './App.css';
import Navbar from './Components/Navbar';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
// import HomePage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import { UserProvider } from './Components/Userinfo/UserContext';
import MoviesPage from './pages/MoviesPage';
import CarouselPage from './Components/Carousel/CarouselPage';
import EventsData from './Components/Carousel/EventsData';
import BookMoviePage from './pages/BookMoviePage';
function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <CarouselPage />
        <EventsData/>
        <Routes>
          <Route  path="/signin" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/buytickets" element={<BookMoviePage />}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
