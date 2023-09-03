import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BokingWidget from "../BookingWidget";

import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";


export default function PlacePage() {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
 
    
    useEffect(()=>{
        if(!id) {
            return;
        }
        axios.get(`https://booking-kohl-five.vercel.app/api/places/${id}`).then(response =>{
            setPlace(response.data)
            // console.log('que me trae',response);

        });
    },[id])

    if(!place) return '';

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-2xl">{place?.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        {/* <div className="w-40">

        <RunGallery place={place}/>
        </div> */}
        <PlaceGallery place={place} />
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-2">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            <p>
              Check-in: {place.checkIn}
              <br />
              Check-out: {place.checkOut}
              <br />
              Max number of guests: {place.maxGuests}
            </p>
          </div>
          <BokingWidget place={place} />
        </div>
        <div>
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>
      </div>
      
        
    );
}