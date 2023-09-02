import { set } from "mongoose";
import { useState } from "react";

export default function BokingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    return(
     
           <div className="mt-4 bg-white shadow p-4 rounded-2xl">
           
          <div className="text-2xl text-center">
                            price: Є{place.price} / per night
                    </div>
                     <div className="border rounded-2xl mt-4">
                        <div className="flex">
                            <div className="py-3 px-4">
                                <label>Check in:</label>
                                <input type="date" 
                                        value={checkIn} 
                                        onChange={ev => setCheckIn(ev.target.value)}/>
                            </div>
                            <div className="py-3 px-4 border-l">
                                <label>Check out:</label>
                                <input type="date" 
                                       value={checkOut} 
                                       onChange={ev => setCheckOut(ev.target.value)}/>
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Number of guests:</label>
                            <input type="number" 
                                   value={numberOfGuests} 
                                   onChange={ev => setNumberOfGuests(ev.target.value)} />
                        </div>
                     </div>
                    <button className="primary mt-4">Book this place</button>
           </div>
   
    );
}