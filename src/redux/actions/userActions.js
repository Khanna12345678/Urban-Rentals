import axios from "axios";
import {message} from 'antd'
import {server} from '../store';

export const userLogin = (reqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    
    try {
        const response = await axios.post(`${server}/users/login` , reqObj, {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
        });
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        message.success("Login Successfull")
        dispatch({ type: "LOADING", payload: false });
        setTimeout(() => {
            window.location.href='/'
         
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Incorrect Username or Password')
        dispatch({ type: "LOADING", payload: false });
    }
}



export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    
    
    try {
        // console.log(reqObj);
        const response = await axios.post(`${server}/users/register` , reqObj, {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
        });
        console.log(response.data);
        message.success("Registartion Successfull")
        dispatch({ type: "LOADING", payload: false });
        setTimeout(() => {
            window.location.href='/login'
         
        }, 500);
    } catch (error) {
        console.log(error);
        message.error('Something Went Wrong')
        dispatch({ type: "LOADING", payload: false });
    }
}