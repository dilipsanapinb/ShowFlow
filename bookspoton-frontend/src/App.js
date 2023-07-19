
import './App.css';
import Navbar from './Components/Navbar';
import { Route, BrowserRouter as Router, Routes, } from "react-router-dom";
// import HomePage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import { UserProvider } from './Components/Userinfo/UserContext';
function App() {
  return (
    // <div className="App">
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<HomePage />} />
        </Routes>
      </Router>
    </UserProvider>
    // </div>
  );
}

export default App;
