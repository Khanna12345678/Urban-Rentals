import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col, Form, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { editCar, getAllCars } from '../redux/actions/carsAction';
import Spinner from '../components/Spinner';
import { useParams , useNavigate } from 'react-router-dom';

const EditCar = () => {

    const {cars} = useSelector(state=>state.cars);
    const {loading} = useSelector(state=>state.alerts);
    const dispatch = useDispatch();
    const {carid} = useParams();
    const [car , setCar] = useState({});
    const [totalCars , setTotalCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(cars.length===0){
            dispatch(getAllCars());
        }
        else{
            setTotalCars(cars);
            setCar(cars.find((car)=>car._id===carid));
        }
    }, [cars , carid , dispatch]);

    const onFinish = (values) => {
        values._id = car._id;
        dispatch(editCar(values , navigate));
    }


  return (
    <DefaultLayout>

        {loading && (<Spinner />)}


        <Row justify='center mt-5'>
            <Col lg={12} sm={24} xs={24} className='p-2'>
                {
                    totalCars.length>0 && (
                        <Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                            <h3>Edit Car</h3>
                            <hr />
                            <Form.Item name='name' label='Car name' rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='image' label='Image Url' rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='rentPerHour' label='Rent Per Hour' rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='capacity' label='Capacity' rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name='fuelType' label='Fuel Type' rules={[{required: true}]}>
                                <Input />
                            </Form.Item>

                            <div className='text-right'>
                                <button className='btn1'>Edit Car</button>
                            </div>


                        </Form>
                    )
                }

            </Col>

        </Row>
    </DefaultLayout>
  )
}

export default EditCar