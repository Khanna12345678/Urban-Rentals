import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/booking/:carid' element={<ProtectedRoute><BookingCar /></ProtectedRoute>} />
          <Route path='/userbookings' element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
          <Route path='/addcar' element={<ProtectedAdminRoute><AddCar /></ProtectedAdminRoute>} />
          <Route path='/editcar/:carid' element={<ProtectedAdminRoute><EditCar /></ProtectedAdminRoute>} />
          <Route path='/admin' element={<ProtectedAdminRoute><AdminHome /></ProtectedAdminRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;