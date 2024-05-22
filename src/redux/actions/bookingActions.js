import axios from 'axios';
import {server} from '../store';
import {message} from 'antd';

export const bookCar = (reqObj) => async (dispatch)=>{
    dispatch({type : 'LOADING' , payload : true});
    
    try {
        await axios.post(`${server}/bookings/bookcar` , reqObj , {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
        });
        dispatch({type : 'LOADING' , payload : false});
        message.success('Car Booked Successfully');
        setTimeout(()=>{
            window.location.href = '/userbookings';
        },500);

    } catch (error) {
        console.log(error);
        dispatch({type : 'LOADING' , payload : false});
        message.error('Something went wrong! Please try again later.');
    }
}



export const getAllBookings = ()=> async (dispatch)=>{
    dispatch({type : 'LOADING' , payload : true});
    
    try {
        const response = await axios.get(`${server}/bookings/getallbookings`);
        // console.log(response.data);
        dispatch({type : 'GET_ALL_BOOKINGS' , payload : response.data})
        dispatch({type : 'LOADING' , payload : false})
    } catch (error) {
        console.log(error);
        dispatch({type : 'LOADING' , payload : false});
    }
}