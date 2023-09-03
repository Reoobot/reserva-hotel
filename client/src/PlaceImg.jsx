import React from 'react';

export default function PlaceImg({ place, index = 0, className = 'object-cover' }) {
  if (!place.photos || place.photos.length === 0) {
    return null; // Opcionalmente, puedes retornar algo como un mensaje de "imagen no disponible"
  }

  return (
    <div className={`bg-gray-500 mb-2 rounded-2xl flex ${className}`}>
      {place.photos[index] && (
        <img
          className="rounded-2xl aspect-square"
          src={`/public/${place.photos[0]}`}
          alt={place.title}
        />
      )}
    </div>
  );
}
