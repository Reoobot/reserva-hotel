import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('https://booking-sable-nine.vercel.app/api/places').then(response => {
      setPlaces(response.data)
    
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <div key={place._id}>
          <Link className='cursor-pointer' to={'/place/'+place._id}>
          <PlaceImg place={place} />
          </Link>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold"> Є{place.price} </span>
            per night
          </div>
        </div>
      ))}
    </div>
  );
}
