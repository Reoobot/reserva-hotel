import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDate from "../BookingDate";

export default function BookingPage(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(()=>{
        if(id){
            axios.get('bookings').then(response => {
               const foundBooking = response.data.find(({_id})=>_id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    },[id])

    if(!booking) {
        return '';
    }
    return(
        <div className="my-8">
  <h1 className="text-3xl">{booking.place.title}</h1>
  <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
  <div className="bg-gray-200 p-6 my-6 rounded-2xl flex flex-col lg:flex-row items-center justify-between">
    <div className="mb-4 lg:mb-0">
      <h2 className="text-2xl">Your booking information:</h2>
      <BookingDate booking={booking} />
    </div>
    <div className="bg-primary p-4 text-white rounded-2xl mt-4 lg:mt-0">
      <div>Total price</div>
      <div className="text-3xl">Є {booking.price}</div>
    </div>
  </div>
  <PlaceGallery place={booking.place} />
</div>

    );
}