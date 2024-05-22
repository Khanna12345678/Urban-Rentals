import { configureStore } from '@reduxjs/toolkit';
import { alertsReducer } from './reducers/alertsReducer';
import { carsReducer } from './reducers/carsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';

  
  const store = configureStore({
    reducer: {
      cars: carsReducer,
      alerts: alertsReducer,
      bookings: bookingsReducer,
    }
  });

export default store;

// export const server = 'http://localhost:5000/api'; // Server URL
export const server = 'https://urbanrentals-server.onrender.com/api'; // Server URL