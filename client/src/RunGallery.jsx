export default function RunGallery({ place }) {
  const numberOfPhotosToShow = 10; 

  return (
    <div className="mb-2 rounded-2xl grid gap-5">
      {place?.photos?.slice(0, numberOfPhotosToShow).map((photo, index) => (
        <img
          key={index}
          className="rounded-2xl object-cover aspect-square"
          src={photo} 
          alt={`${place.title} - Photo ${index + 1}`}
        />
      ))}
    </div>
  );
}












// export default function RunGallery() {
//   const numberOfPhotosToShow = 5; 
//   const place = {
 
//     photos: [

//       "https://a0.muscache.com/im/pictures/e1889a9e-92a5-4887-9e59-e9bf6be186f5.jpg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51225228/original/97586943-e4cc-4edd-a05e-9748f166f42b.jpeg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/e1889a9e-92a5-4887-9e59-e9bf6be186f5.jpg?im_w=1200",
//       "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51225228/original/97586943-e4cc-4edd-a05e-9748f166f42b.jpeg?im_w=1200"
//     ],

//   };
  



  
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