
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import SignInPage from './pages/SignInPage'

import MoviesPage from './pages/MoviesPage';
import BookMoviePage from './pages/BookMoviePage';
import PaymentModel from './Components/PaymentModel/PaymentModel';
import Landingpage from './pages/Landingpage';
function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Landingpage/> } />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/buytickets" element={<BookMoviePage />} />
          <Route path="/payment" element={<PaymentModel />} />
        </Routes>
      </Router>
  );
}

export default App;
