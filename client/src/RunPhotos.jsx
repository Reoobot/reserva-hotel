export default function RunPhotos({ place, booking }) {
  return (
    <div className="bg-gray-500 mb-2 rounded-2xl flex">
      {place.photos && place.photos[0] && (
              <img
                src={place.photos[0]}
                alt={`Photo 1`}
                className="mb-2 rounded-2xl object-cover aspect-square"
              />
            )}
    </div>
  );
}






















// export default function RunPhotos({place}) {
//   // const numberOfPhotosToShow = 1; 

//   // const place = {
 
//   //   photos: [
      
//   //     "https://a0.muscache.com/im/pictures/e1889a9e-92a5-4887-9e59-e9bf6be186f5.jpg?im_w=1200",
//   //     "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51225228/original/97586943-e4cc-4edd-a05e-9748f166f42b.jpeg?im_w=1200",
//   //        "https://a0.muscache.com/im/pictures/60d4058e-98a8-4f30-ba8a-93b101a31c47.jpg?im_w=1200",
//   //         "https://a0.muscache.com/im/pictures/2a4637ae-4322-4623-9475-aad69250ba90.jpg?im_w=720",
//   //         "https://a0.muscache.com/im/pictures/72e3dfea-2b90-4afe-a1bd-1be37e77539a.jpg?im_w=720",
//   //         "https://a0.muscache.com/im/pictures/a24b4c1f-5244-4db3-920f-6dc836a3c0d9.jpg?im_w=1200"
//   //   ],

//   // };
  



  
//   return (
//     <div className="mb-2 rounded-2xl grid gap-5">
//       {place.photos?.slice(0, numberOfPhotosToShow).map((photo, index) => (
//         <img
//           key={index}
//           className="rounded-2xl object-cover aspect-square"
//           src={photo} // Utiliza la ruta local de la imagen
//           alt={`${place.title} - Photo ${index + 1}`}
//         />
//       ))}
//     </div>
//   );
// }