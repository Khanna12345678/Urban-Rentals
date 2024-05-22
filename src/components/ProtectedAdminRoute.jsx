import React from 'react'
import { Navigate } from 'react-router-dom';
import {message} from 'antd';

const ProtectedAdminRoute = ({ children }) => {
    // const user = localStorage.getItem('user');
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
  
    if (user.role!=='admin') {
      message.error('You are not authorized to view this page');
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };
  
  export default ProtectedAdminRoute;