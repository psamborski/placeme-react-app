import React, { useContext, useState } from 'react';

const MapPositionContext = React.createContext();
const MapPositionUpdateContext = React.createContext();
const MapPolygonCoordsContext = React.createContext();
const MapPolygonCoordsUpdateContext = React.createContext();

export function useMapPosition() {
  return useContext(MapPositionContext);
}

export function useMapPositionUpdate() {
  return useContext(MapPositionUpdateContext);
}

export function useMapPolygonCoords() {
  return useContext(MapPolygonCoordsContext);
}

export function useMapPolygonCoordsUpdate() {
  return useContext(MapPolygonCoordsUpdateContext);
}

export function MapProvider({ children }) {
  const [mapPosition, setMapPosition] = useState([52.18853, 20.99393]);
  const [polygonCoords, setPolygonCoords] = useState([]);

  function changeMapPosition(lat, lng) {
    setMapPosition([lat, lng]);
  }

  function changePolygonCoords(apiCoordsData) {
    setPolygonCoords(apiCoordsData);
  }

  return (
    <MapPositionContext.Provider value={mapPosition}>
      <MapPositionUpdateContext.Provider value={changeMapPosition}>
        <MapPolygonCoordsContext.Provider value={polygonCoords}>
          <MapPolygonCoordsUpdateContext.Provider value={changePolygonCoords}>
            {children}
          </MapPolygonCoordsUpdateContext.Provider>
        </MapPolygonCoordsContext.Provider>
      </MapPositionUpdateContext.Provider>
    </MapPositionContext.Provider>
  );
}
