import './App.css';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";
import MapContainer from './MapContainer';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from "d3";

import DRAWING from "./EEME1.png";
import ROOM_128 from "./room128.jpg";
import BATHROOM from "./bathroom.jpg"
import VENDING from "./vending.jpg";
import EEME1 from "./EEME1grey.png";
import EEME2 from "./EEME2grey.png";
import Marker from "./Marker"
import mark128 from "./markers/floor1rooms/128.png";
function Galactus(lat, lng) {
  const left = -74500 * (lat - 46.73176)
  const top = 1075000 * (lng + 117.16967);

  return {
    left: `${left}%`,
    top: `${top}%`
  }
}

const EEME1_MAP_LOCS = [
  {
    id: 1,
    lat: 46.7305450,
    lng: -117.1695850,
    title: "Room 128",
    icon: "http://maps.google.com/mapfiles/kml/shapes/polygon.png",
    sub: "CS Lab",
    floor: "1",
    image: ROOM_128,
    type: "class"
  },
  {
    id: 2,
    lat: 46.7304500,
    lng: -117.1695850,
    title: "Male Bathroom",
    floor: "1",
    image: BATHROOM,
    type: "amenities",
    avgScore: 4,
    reviews: [
      {
        title: "Pleasant experience! Would go again.",
        stars: 4,
        body: "The bathroom  was kept clean."
      }
    ]
  },
  {
    id: 3,
    lat: 46.7304500,
    lng: -117.169725,
    title: "Vending Machine",
    floor: "1",
    image: VENDING,
    type: "amenities",
    avgScore: 4,
    reviews: [
      {
        title: "Stale chips.",
        stars: 2,
        body: "The chips were very old, probably been sitting there for a while."
      },
      {
        title: "Good coke",
        stars: 2,
        body: "Good coke 👍"
      }
    ]
  },
];

const EEME2_LOC = [

];

const CLASS_OPTS = [
  {
    time: "2PM - 3PM",
    title: "CPTS 121",
    instructor: "John Doe",
    status: "Started"
  },
  {
    time: "4:15PM - 5:30PM",
    title: "CPTS 122",
    instructor: "Nathan Tenney",

  },
  {
    time: "6:00PM - 7:00PM",
    title: "CPTS 360",
    instructor: "K. C. Wang"
  },
]
function App() {
  const initialPos = {
    lat: 46.7306848,
    lng: -117.1693675
  }
  const [currentPostion, setCurrentPosition] = useState(initialPos);
  const [center, setCenter] = useState(initialPos);
 
  const [map, setMap] = React.useState();
  const [style, setStyle] = useState({});
  const [selectedLoc, setSelectedLoc] = useState(null);
  const [currentFloorPlan, setCurrentFloorPlan] = useState(EEME1);
  const markerRef = useRef(null);

  const [filter, setFilter] = useState("");
  useEffect(() => {


    setInterval(() => {
      const sufferingFromSuccess = (position) => {
        const currentPOS = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        setCurrentPosition(currentPOS);
      }
      navigator.geolocation.getCurrentPosition(sufferingFromSuccess, () => 32);

    }, 1000)



  }, []);

  useEffect(() => {
    const style = Galactus(currentPostion.lat, currentPostion.lng);


    setStyle(style);
    if (!markerRef.current) {
      return;
    }

    const markerElem = markerRef.current;

    markerElem.style.left = style.left;
    markerElem.style.top = style.top;

  }, [currentPostion, markerRef])



  const renderLocs = () => {
    let markersToUse;
    if (currentFloorPlan === EEME1) {
      markersToUse = EEME1_MAP_LOCS;
    } else {
      markersToUse = [];
    }
    return markersToUse.map((marker) => {
      return (
        <Marker position={{
          lat: marker.lat,
          lng: marker.lng,

        }} onMarkerClick={() => {
          setSelectedLoc(marker);
        }} />
      )

    })
  }

  const renderResults = () => {
    let markersToUse;
    if (currentFloorPlan === EEME1) {
      markersToUse = EEME1_MAP_LOCS;
    } else {
      markersToUse = [];
    }

    const filteredResults = markersToUse.filter((loc) => {
      return loc.title.toLowerCase().includes(filter.toLowerCase());
    })


    return (
      <div className="results-container">
        {filteredResults.map(res => {
          return <div className='result-option' onClick={() => {
            map.panTo({
              lat: res.lat,
              lng: res.lng
            })

            map.setZoom(21);

            setSelectedLoc(res);
            setFilter("");
          }}>
            {res.title}
          </div>
        })}
      </div>
    )
  }

  const onToggleFloor = () => {
    if (currentFloorPlan === EEME1) {
    setCurrentFloorPlan(EEME2);

    } else {
      setCurrentFloorPlan(EEME1)
    }

    setSelectedLoc(null);
  }
  return (
    <div className="App" >
      <header className="app-header">
        <h1>Crimson Locator</h1>
      </header>

      <main style={{ height: "100%" }} id="mainContainer">

        <div style={{ height: "100%" }} >
          <div className="action-container">
          <div className="input-container">
            <input placeholder="Search locations..." value={filter} onChange={e => setFilter(e.target.value)}/>
            {filter && renderResults()}
          </div>
          <button onClick={onToggleFloor}>{currentFloorPlan === EEME1 ? "To Floor 2" : "To Floor 1"}</button>
          </div>
          
          <Wrapper apiKey={process.env.REACT_APP_API_KEY} style={{ height: "50rem" }} >
            <Map center={center} zoom={20} style={{
              height: "45rem"
            }} map={map} setMap={setMap} currentFloorPlan={currentFloorPlan}>
              <Marker position={currentPostion} />
              {renderLocs()}
            </Map>
          </Wrapper>
        </div>
        {selectedLoc && <aside className='selected-loc-aside'>

          <section className="loc-title">
            <h3>{selectedLoc.title}</h3>
            <p>{selectedLoc.sub}</p>
            <p>Floor: {selectedLoc.floor}</p>
          </section>
          
          <h3 className="heading">Photo</h3>
          <section className="loc-photo-container">
            <img src={selectedLoc.image} />
          </section>
          {
            selectedLoc.type === "class" && (
              <>
                <h3 className="heading">Class Schedule</h3>
                <section className="class-option-wrapper">
                  {CLASS_OPTS.map(opt => (
                    <div className='class-option'>
                      <h3>{opt.title}</h3>
                      <p>{opt.instructor}</p>
                      <div className="time-wrapper">
                        <p className={`status ${opt.status ? "started" : "upcoming"}`}>
                          {opt.status ?? "Upcoming"}
                        </p>                  
                        <p className="time">
                          {opt.time}
                        </p>
                      </div>
                    </div>
                  ))}
          </section>

                </>
            )
          }

          {
            selectedLoc.type === "other" && (
              <>
                <h3 className="heading">Reviews</h3>
                <section className="review-option-wrapper">
                  {selectedLoc.reviews.map(opt => (
                    <div className='review-option'>
                      <h3>{opt.title}</h3>
                      <div className="star-wrapper">
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                      </div>
                      <p>{opt.body}</p>
                    </div>
                  ))}
          </section>

                </>
          
            )
          }
         
       
        </aside>}
      </main>


    </div>
  );
}

export default App;
