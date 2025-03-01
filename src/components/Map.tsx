import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { getDistance } from "../utils/geolocation"; // Asegúrate de que esta importación sea correcta.

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface Farmacia {
  Nombre: string;
  Latitud: number;
  Longitud: number;
}

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [farmacias, setFarmacias] = useState<Farmacia[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestFarmacia, setNearestFarmacia] = useState<Farmacia | null>(null);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          alert("No se pudo obtener tu ubicación. Por favor, habilita los permisos de ubicación.");
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/geolocalizacion")
      .then((res) => res.json())
      .then((data) => setFarmacias(data))
      .catch((error) => console.error("Error al obtener farmacias:", error)); // Manejo de errores
  }, []);

  const findNearestFarmacia = () => {
    if (!userLocation || farmacias.length === 0) return;

    let nearest: Farmacia | null = null;
    let minDistance = Infinity;

    farmacias.forEach((farmacia) => {
      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        farmacia.Latitud,
        farmacia.Longitud
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = farmacia;
      }
    });

    setNearestFarmacia(nearest);
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-66.1898, -17.3509], // Coordenadas más cercanas
      zoom: 12,
      attributionControl: false,
    });

    setMapInstance(map);

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapInstance || !nearestFarmacia) return;

    new mapboxgl.Marker({ color: 'blue', scale: 1.5 })
      .setLngLat([nearestFarmacia.Longitud, nearestFarmacia.Latitud])
      .setPopup(new mapboxgl.Popup().setText(`Sucursal más cercana: ${nearestFarmacia.Nombre}`))
      .addTo(mapInstance);

    mapInstance.flyTo({
      center: [nearestFarmacia.Longitud, nearestFarmacia.Latitud],
      zoom: 14,
      essential: true,
    });
  }, [nearestFarmacia, mapInstance]);

  useEffect(() => {
    if (!mapInstance || !userLocation) return;

    if (!userMarkerRef.current) {
      userMarkerRef.current = new mapboxgl.Marker({ color: 'red', scale: 1.5 })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(mapInstance);
    } else {
      userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
    }

    mapInstance.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 14,
      essential: true,
    });
  }, [userLocation, mapInstance]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px", overflow: "hidden" }} />
      <button onClick={findNearestFarmacia}>Find your nearest branch</button>
      {userLocation && (
        <p>Tu ubicación actual: Latitud {userLocation.lat}, Longitud {userLocation.lng}</p>
      )}
      {nearestFarmacia && (
        <div>
          <p>La sucursal más cercana es: {nearestFarmacia.Nombre}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
