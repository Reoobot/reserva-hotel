import axios from "axios";
import { useEffect, useState } from "react";


export default function IndexPage(){
const [places,setPlaces] = useState([])

  useEffect(()=>{
    //nota recuerda modificar la api y la imag por 4000 solo
    axios.get('/places').then(response=>{
      setPlaces([...response.data,...response.data,...response.data,...response.data])
      console.log('prueba',response.data);
    })
  },[])
    return(
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
         {places.length > 0 && places.map(place=>(
          <div>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img 
                key={place.photos[0]}
                  className="rounded-2xl object-cover aspect-square" src={'http://localhost:4001/uploads/'+place.photos?.[0]} alt="" />
                )}
            </div>
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