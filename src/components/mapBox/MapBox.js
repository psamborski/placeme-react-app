import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polygon } from 'react-leaflet';
import styled from 'styled-components';

import { useMapPosition, useMapPolygonCoords } from '../../app/MapContext';

const PopupTextComma = styled.span`
  margin: 0 3px;
`;

function MyComponent() {
  const mapPosition = useMapPosition();
  const map = useMap();
  map.flyTo(mapPosition, map.getZoom());
  return null;
}

const MapBox = () => {
  const mapPosition = useMapPosition();
  const mapPolygonCoords = useMapPolygonCoords();
  const purpleOptions = { color: '#442fad' };
  const polygon = [mapPolygonCoords];

  return (
    <>
      <MapContainer
        style={{ height: '100vh', width: '100%' }}
        center={mapPosition}
        zoom={18}
        scrollWheelZoom={true}
      >
        <MyComponent />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        <Marker position={mapPosition}>
          <Popup>
            You are here:
            <p>
              <span>{mapPosition[0]}</span>
              <PopupTextComma>,</PopupTextComma>
              <span>{mapPosition[1]}</span>
            </p>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapBox;
