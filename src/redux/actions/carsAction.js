import axios from 'axios';
import {server} from '../store';
import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';



export const getAllCars = ()=> async (dispatch)=>{
    dispatch({type : 'LOADING' , payload : true});
    
    try {
        const response = await axios.get(`${server}/cars/getallcars`);
        // console.log(response.data);
        dispatch({type : 'GET_ALL_CARS' , payload : response.data})
        dispatch({type : 'LOADING' , payload : false})
    } catch (error) {
        console.log(error);
        dispatch({type : 'LOADING' , payload : false});
    }
}



export const addCar = (reqObj , navigate)=> async (dispatch)=>{
    dispatch({type : 'LOADING' , payload : true});
    
    try {
        await axios.post(`${server}/cars/addcar`, reqObj , {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
        }
        );
        // console.log(response.data);
        dispatch({type : 'LOADING' , payload : false})
        message.success('Car Added Successfully');
        // const navigate = useNavigate();
        setTimeout(()=>{
            // window.location.href = '/admin';
            navigate('/admin');
        },500);
    } catch (error) {
        console.log(error);
        dispatch({type : 'LOADING' , payload : false});
    }
}



export const editCar = (reqObj , navigate)=> async (dispatch)=>{
    dispatch({type : 'LOADING' , payload : true});
    
    try {
        await axios.post(`${server}/cars/editcar`, reqObj , {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
        }
        );
        // console.log(response.data);
        dispatch({type : 'LOADING' , payload : false})
        message.success('Car Details Updated Successfully');
        // const navigate = useNavigate();
        setTimeout(()=>{
            // window.location.href = '/admin';
            navigate('/admin');
        },500);
    } catch (error) {
        console.log(error);
        dispatch({type : 'LOADING' , payload : false});
    }
}



export const deleteCar = (reqObj , navigate)=> async (dispatch)=>{
    dispatch({type : 'LOADING' , payload : true});
    
    try {
        await axios.post(`${server}/cars/deletecar`, reqObj , {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
        }
        );
        // console.log(response.data);
        dispatch({type : 'LOADING' , payload : false})
        message.success('Car Deleted Successfully');
        // const navigate = useNavigate();
        setTimeout(()=>{
            // window.location.reload();
            navigate('/');

        },500);
    } catch (error) {
        console.log(error);
        dispatch({type : 'LOADING' , payload : false});
    }
}