export default function RunPhotos({place,booking}){
    return(
        <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img
                className="rounded-2xl object-cover aspect-square"
                src={`/public/${place.photos[0]}`}
                alt={place.title}
              />
            )}
        </div>
    );
}