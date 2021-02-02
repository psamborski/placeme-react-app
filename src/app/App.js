import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { MapProvider } from './MapContext';
import MapBox from '../components/mapBox/MapBox';
import MapForm from '../components/mapForm/MapForm';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }
`;

function App() {
  return (
    <>
      <MapProvider>
        <GlobalStyle />
        <MapBox />
        <MapForm />
      </MapProvider>
    </>
  );
}

export default App;
