import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCar, getAllCars } from '../redux/actions/carsAction';
import {  Row, Col } from 'antd';
import Spinner from '../components/Spinner';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link , useNavigate } from 'react-router-dom';
import {Popconfirm } from 'antd';

const AdminHome = () => {
  const { cars } = useSelector(state => state.cars);
  const { loading } = useSelector(state => state.alerts);
  const [totalCars, setTotalCars] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  // console.log(loading);

  useEffect(() => {
    dispatch(getAllCars());
}, [dispatch])

  useEffect(() => {
    setTotalCars(cars);
  }, [cars])

  // console.log(cars);

  

  return (
    <DefaultLayout>

        <Row justify='center' gutter={16} className='mt-2'>
          <Col lg={20} sm={24}>
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className='mt-1 mr-2' style={{fontFamily: 'Montserrat'}}>Admin Panel</h3>
              <button className='btn1'><Link to="/addcar">Add Car</Link></button>
            </div>
          </Col>
        </Row>


        {
          loading===true && (<Spinner />)
        }

        {/* <h3 className="text-center mt-2">Admin Panel</h3> */}
    

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
                                  <p> Rent Per Hour ₹{car.rentPerHour}</p>
                              </div>

                              <div className='mr-4'>
                                <Link to={`/editcar/${car._id}`}><EditOutlined className='mr-3' style={{fontSize: '20px', color: 'blue' , cursor: 'pointer'}} /></Link>

                                <Popconfirm title='Are you sure want to delete this car ?' onConfirm={()=>{dispatch(deleteCar({carid: car._id} , navigate))}} okText='Yes' cancelText='No'>
                                  <DeleteOutlined style={{fontSize: '20px', color: 'red' , cursor: 'pointer'}} />
                                </Popconfirm>


                                
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

export default AdminHome;
