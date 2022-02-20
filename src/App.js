import './App.css';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";
import MapContainer from './MapContainer';
import { useEffect, useRef, useState } from 'react';
import * as d3 from "d3";

import DRAWING from "./EEME1.png";
import { image } from 'd3';
import Marker from "./Marker"
function Galactus(lat, lng) {
  const left = -74500 * (lat - 46.73176)
  const top = 1075000 * (lng + 117.16967);

  return {
    left: `${left}%`,
    top: `${top}%`
  }
}


function App() {
  const initialPos = {
      lat: 46.7306848,
  lng: -117.1693675
  }
  const [currentPostion, setCurrentPosition] = useState(initialPos);
  const [center, setCenter] = useState(initialPos);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [style, setStyle] = useState({});

  const markerRef = useRef(null);
  const [markerPOS, setMarkerPOS] = useState({ top: 0, left: 0 });
  useEffect(() => {
  

      setInterval(() => {
        const sufferingFromSuccess = (position) => {
          const currentPOS = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          
          console.log('CurrentPOS', currentPOS)
          setCurrentPosition(currentPOS);
        }
        navigator.geolocation.getCurrentPosition(sufferingFromSuccess, () => 32);
        
      }, 1000)
     
    

  }, []);

  useEffect(() => {
    const style = Galactus(currentPostion.lat, currentPostion.lng);

    console.log(style);
    console.log(currentPostion);

    setStyle(style);
    if (!markerRef.current) {
      return;
    }

    const markerElem = markerRef.current;

    markerElem.style.left = style.left;
    markerElem.style.top = style.top;

  }, [currentPostion, markerRef])


  const renderImageDimensions = () => {

    return `width: ${imageDimensions.width}, height: ${imageDimensions.height}`
  }
 


  return (
    <div className="App">
      <header className="app-header">
        <h1>Crimson Locator</h1>
      </header>
      
      <main style={{ height: "100%" }} id="mainContainer">
        style: {JSON.stringify(style)}
        {renderImageDimensions()}

          <Wrapper apiKey={process.env.REACT_APP_API_KEY}>
            <Map center={center} zoom={20}>
              <Marker position={currentPostion}/>
            </Map>
          </Wrapper>
     

      </main>
    </div>
  );
}

export default App;
