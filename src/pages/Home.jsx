import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsAction';
import {  Row, Col , DatePicker  } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

const Home = () => {
  const { cars } = useSelector(state => state.cars);
  const { loading } = useSelector(state => state.alerts);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();

  
  // console.log(loading);

  useEffect(() => {
    dispatch(getAllCars());
}, [dispatch])

  useEffect(() => {
    setTotalCars(cars);
  }, [cars])

  // console.log(cars);

  const setFilter = (values) => {
    var selectedFrom = moment(values[0] , 'MMM DD YYYY HH:mm');
    var selectedTo = moment(values[1] , 'MMM DD YYYY HH:mm');

    var temp=[];

    for(var car of cars){
      if(car.bookedTimeSlots.length===0){
        temp.push(car);
      }
      else{
        for(var booking of car.bookedTimeSlots){
          if(selectedFrom.isBetween(booking.from, booking.to) || selectedTo.isBetween(booking.from, booking.to) || dayjs(booking.from).isBetween(selectedFrom , selectedTo) || dayjs(booking.to).isBetween(selectedFrom , selectedTo) ){
              continue;
          }
          else{
            temp.push(car);
          }
        }
      }
    }

    setTotalCars(temp);

  }

  return (
    <DefaultLayout>

        <Row className='mt-3' justify='center'>
          <Col lg={20} sm={24} xs={24} className='d-flex justify-content-left' >
              <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD YYYY HH:mm' onChange={setFilter} />
          </Col>
        </Row>


        {
          loading===true && (<Spinner />)
        }

        <Row justify='center' gutter={16} >
            {
              totalCars.map(car=>{
                return(
                  <Col lg={5} sm={24} xs={24} >
                    <div className='car p-2 bs1' key={car._id}>
                        <img src={car.image} className='carimg' alt='Car' />
                        <div className='car-content d-flex align-items-center justify-content-between'>
                              <div className='text-left pl-2'>
                                  <p>{car.name}</p>
                                  <p> Rent Per Hour ₹{car.rentPerHour} </p>
                              </div>

                              <div>
                                  <button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                              </div>
                        </div>
                    </div>
                  </Col>
                )
              
              })
            }
        </Row>
    </DefaultLayout>
  );
};

export default Home;
