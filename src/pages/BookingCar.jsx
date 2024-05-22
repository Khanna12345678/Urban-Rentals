import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/actions/carsAction';
import { useParams , useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Row, Col, Divider , DatePicker, Checkbox , Modal } from 'antd';
import dayjs from 'dayjs'
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const { RangePicker } = DatePicker;


const BookingCar = () => {

  const { cars } = useSelector(state => state.cars);
  const { loading } = useSelector(state => state.alerts);
  const dispatch = useDispatch();
  const [car , setCar] = useState({});
  const {carid} = useParams();
  const [from , setFrom] = useState('');
  const [to , setTo] = useState('');
  const [totalHours , setTotalHours] = useState(0);
  const [driver , setDriver] = useState(false);
  const [totalAmount , setTotalAmount] = useState(0);
  const [showModal , setShowModal] = useState(false);
  const navigate = useNavigate();

  console.log(showModal);

  useEffect(() => {
    if(cars.length===0){
      dispatch(getAllCars());
    }
    else{
      setCar(cars.find(car=>car._id===carid));
    }
  }, [cars , carid , dispatch]);

  useEffect(() => {
    if(totalHours>0){
      let amount = totalHours * car.rentPerHour;
      if(driver){
        amount += totalHours * 100;
      }
      setTotalAmount(amount);
    }
  }, [totalHours, driver , car.rentPerHour]);



  const selectTimeSlots = (values) => {
    setFrom(dayjs(values[0]).format("MMM DD YYYY HH:mm"));
    setTo(dayjs(values[1]).format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], 'hours'));
  }

  const onToken = (token) => {
    const reqObj ={
      token,
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }
    }
    dispatch(bookCar(reqObj , navigate));
  }


  return (
    <DefaultLayout>
        {loading && (<Spinner />)}

        <Row justify='center' className='d-flex align-items-center' style={{minHeight: '80vh'}}>
            <Col lg={10} sm={24} xs={24} className='p-3' >
                <img src={car.image} className='carimg2 bs1 w-100' data-aos='flip-left' data-aos-duration='1500' alt='Car' />
            </Col>

            <Col lg={10} sm={24} xs={24} className='text-right' >
              <Divider type="horizontal" dashed style={{ borderColor: 'rgba(0,0,0,0.85)' }}>
                Car Info
              </Divider>
              <div style={{ textAlign: "right" }}>
                <p>{car.name}</p>
                <p> Rent Per hour ₹{car.rentPerHour}</p>
                <p>Fuel Type : {car.fuelType}</p>
                <p>Max Persons : {car.capacity}</p>
              </div>
              
              <Divider type="horizontal" dashed style={{ borderColor: 'rgba(0,0,0,0.85)' }}>
                Select Time Slots
              </Divider>
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="MMM DD YYYY HH:mm"
                onChange={selectTimeSlots}
              />
              <br />

              <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
              

              {
                from && to && (
                  <div>
                    <p>Total Hours : <b>{totalHours}</b></p>
                    <p>Rent Per Hour : <b>₹{car.rentPerHour}</b></p>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDriver(true);
                        } else {
                          setDriver(false);
                        }
                      }}
                    >
                      Driver Required
                  </Checkbox>
                  <h3>Total Amount : ₹{totalAmount}</h3>

                  <StripeCheckout
                    shippingAddress
                    token={onToken}
                    currency='inr'
                    amount={totalAmount * 100}
                    stripeKey="pk_test_51PItSESCIcgAOX1E1OKgwZ1pCkpQlISOQ4JD3tHBjHcQ0FY2UGqodPgXrJhYtqApWVPKA3Vvam9zmaWLjXgExocf004xq7lyCa"
                  >
                    <button className='btn1'>Book Now</button>
                  </StripeCheckout>

                  

                  </div>
                )
              }
                
            </Col>

            {
              car.name && (
                <Modal open={showModal} closable={false} footer={false} title='Booked Time Slots'>
                  <div className='p-2'>
                    {
                      car.bookedTimeSlots.map(slot=>{
                        return(
                          <button className='btn1 mt-2'>
                            {slot.from} - {slot.to}
                          </button>
                        )
                      })
                    }
                    <div className='text-right mt-5'>
                      <button className='btn1' onClick={()=>{setShowModal(false)}}>Close</button>
                    </div>
                  </div>
              </Modal>
              )
            }


        </Row>


    </DefaultLayout>
  )
}

export default BookingCar