export default function RunGallery({ place}) {
    const numberOfPhotosToShow = 10; // Cambia este número según tus necesidades
  
    return (
      <div className=" mb-2 rounded-2xl grid gap-5">
        {place.photos?.slice(0, numberOfPhotosToShow).map((photo, index) => (
          <img
            key={index}
            className="rounded-2xl object-cover aspect-square "
            src={`/public/${photo}`}
            alt={`${place.title} - Photo ${index + 1}`}
          />
        ))}
      </div>
    );
  }
  