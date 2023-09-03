
import { useEffect, useState } from "react";
import { differenceInCalendarDays } from 'date-fns';
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function BokingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user) {
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0;
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    async function bookingThisplace(){
        const response =  await axios.post('/bookings',{
            checkIn,checkOut,numberOfGuests,name,phone,
            place:place._id,
            price:numberOfNights * place.price
        });
        const bookingId = response.data._id;
        setRedirect(`https://booking-sand-two.vercel.app/api/bookings/${bookingId}`);
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
  
    return(
     
        <div className="mt-4 bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: Є{place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="md:flex">
            <div className="py-3 px-4">
              <label className="block">Check-in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="block w-full border rounded-2xl focus:outline-none focus:ring focus:border-primary"
              />
            </div>
            <div className="py-3 px-4 border-t md:border-t-0 md:border-l">
              <label className="block">Check-out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="block w-full border rounded-2xl focus:outline-none focus:ring focus:border-primary"
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label className="block">Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
              className="block w-full border rounded-2xl focus:outline-none focus:ring focus:border-primary"
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label className="block">Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="block w-full border rounded-2xl focus:outline-none focus:ring focus:border-primary"
              />
              <label className="block">Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                className="block w-full border rounded-2xl focus:outline-none focus:ring focus:border-primary"
              />
            </div>
          )}
        </div>
        <button onClick={bookingThisplace} className="primary mt-4 w-full">
          Book this place
          {numberOfNights > 0 && (
            <span> Є {numberOfNights * place?.price}</span>
          )}
        </button>
      </div>
      
    );
}