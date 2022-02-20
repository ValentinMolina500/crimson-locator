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
import Marker from "./Marker";
import mark_alarm from "./markers/info/alarm.png";
import mark_elevator from "./markers/info/elevator.png";
import mark_extinguisher from "./markers/info/extinguisher.png";
import mark_mrestroom from "./markers/info/mrestroom.png";
import mark_nrestroom from "./markers/info/nrestroom.png";
import mark_vending from "./markers/info/vending.png";
import mark_water from "./markers/info/water.png";
import mark_wrestroom from "./markers/info/wrestroom.png";
import mark_128 from "./markers/floor1rooms/128.png";
import mark_102 from "./markers/floor1rooms/102.png";
import mark_102A from "./markers/floor1rooms/102A.png";
import mark_102C from "./markers/floor1rooms/102C.png";
import mark_102D from "./markers/floor1rooms/102D.png";
import mark_102E from "./markers/floor1rooms/102E.png";
import mark_102F from "./markers/floor1rooms/102F.png";
import mark_102G from "./markers/floor1rooms/102G.png";
import mark_105 from "./markers/floor1rooms/105.png";
import mark_106 from "./markers/floor1rooms/106.png";
import mark_107 from "./markers/floor1rooms/107.png";
import mark_120 from "./markers/floor1rooms/120.png";
import mark_121 from "./markers/floor1rooms/121.png";
import mark_123 from "./markers/floor1rooms/123.png";
import mark_125 from "./markers/floor1rooms/125.png";
import mark_127 from "./markers/floor1rooms/127.png";
import mark_130 from "./markers/floor1rooms/130.png";
import mark_131 from "./markers/floor1rooms/131.png";
import mark_133 from "./markers/floor1rooms/133.png";
import mark_135 from "./markers/floor1rooms/135.png";
import mark_136 from "./markers/floor1rooms/136.png";
import mark_137 from "./markers/floor1rooms/137.png";
import mark_143 from "./markers/floor1rooms/143.png";
import mark_145 from "./markers/floor1rooms/145.png";
import mark_147 from "./markers/floor1rooms/147.png";
import mark_149 from "./markers/floor1rooms/149.png";
import mark_152 from "./markers/floor1rooms/152.png";
import mark_153 from "./markers/floor1rooms/153.png";
import mark_154 from "./markers/floor1rooms/154.png";
import mark_155 from "./markers/floor1rooms/155.png";
import mark_157 from "./markers/floor1rooms/157.png";
import mark_159 from "./markers/floor1rooms/159.png";

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
    lat: 46.73058,
    lng: -117.16962,
    title: "Room 128",
    sub: "CS Lab",
    floor: "1",
    image: ROOM_128,
    type: "class",
    icon: mark_128
  },
  {
    id: 2,
    lat: 46.7304500,
    lng: -117.1695850,
    title: "Male Bathroom",
    sub: "(ADA)",
    floor: "1",
    image: BATHROOM,
    icon: mark_mrestroom,
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
    icon: mark_vending,
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
  {
    id: 4,
    lat: 46.73053,
    lng: -117.169075,
    title: "Room 102",
    sub: "Offices",
    floor: "1",
    type: "office",
    icon: mark_102
  },
  {
    id: 5,
    lat: 46.730475,
    lng: -117.16895,
    title: "Room 102A",
    sub: "Conference Room",
    floor: "1",
    type: "office",
    icon: mark_102A
  },
  {
    id: 6,
    lat: 46.73048,
    lng: -117.169025,
    title: "Room 102C",
    sub: "Empty Office",
    floor: "1",
    type: "office",
    icon: mark_102C
  },
  {
    id: 7,
    lat: 46.7304775,
    lng: -117.1690645,
    title: "Room 102D",
    sub: "Lourana Swayne",
    floor: "1",
    type: "office",
    icon: mark_102D
  },
  {
    id: 8,
    lat: 46.730483,
    lng: -117.169114,
    title: "Room 102E",
    sub: "Gwen Miller",
    floor: "1",
    type: "office",
    icon: mark_102E
  },
  {
    id: 9,
    lat: 46.73049,
    lng: -117.169157,
    title: "Room 102F",
    sub: "Partha Pande",
    floor: "1",
    type: "office",
    icon: mark_102F
  },
  {
    id: 10,
    lat: 46.73050,
    lng: -117.1692,
    title: "Room 102G",
    sub: "Partha Pande",
    floor: "1",
    type: "office",
    icon: mark_102G
  },
  {
    id: 12,
    lat: 46.73044,
    lng: -117.169335,
    title: "Room 105",
    sub: "EECS Research Lab",
    floor: "1",
    type: "class",
    icon: mark_106
  },
  {
    id: 13,
    lat: 46.730445,
    lng: -117.16941,
    title: "Room 107",
    sub: "3D Printing Club",
    floor: "1",
    type: "class",
    icon: mark_107
  },
  {
    id: 14,
    lat: 46.730356,
    lng: -117.16939,
    title: "Room 152",
    sub: "ME CAD Lab",
    floor: "1",
    type: "class",
    icon: mark_152
  },
  {
    id: 15,
    lat: 46.730419,
    lng: -117.169527,
    title: "Room 143",
    sub: "Charles Pezeshki",
    floor: "1",
    type: "office",
    icon: mark_143
  },
  {
    id: 16,
    lat: 46.73039,
    lng: -117.169527,
    title: "Room 145",
    sub: "Sinisa Mesarovic",
    floor: "1",
    type: "office",
    icon: mark_145
  },
  {
    id: 17,
    lat: 46.73036,
    lng: -117.16953,
    title: "Room 147",
    sub: "Dustin McLarty",
    floor: "1",
    type: "office",
    icon: mark_147
  },
  {
    id: 18,
    lat: 46.73033,
    lng: -117.16953,
    title: "Room 149",
    sub: "Nestor Prez-Arancibia",
    floor: "1",
    type: "office",
    icon: mark_149
  },
  {
    id: 19,
    lat: 46.73026,
    lng: -117.16954,
    title: "Room 153",
    sub: "Empty Office",
    floor: "1",
    type: "office",
    icon: mark_153
  },
  {
    id: 20,
    lat: 46.73023,
    lng: -117.169542,
    title: "Room 155",
    sub: "Lloyd Smith",
    floor: "1",
    type: "office",
    icon: mark_155
  },
  {
    id: 21,
    lat: 46.73020,
    lng: -117.169544,
    title: "Room 157",
    sub: "Empty Office",
    floor: "1",
    type: "office",
    icon: mark_157
  },
  {
    id: 22,
    lat: 46.73017,
    lng: -117.16955,
    title: "Room 159",
    sub: "Min Kyu Song",
    floor: "1",
    type: "office",
    icon: mark_159
  },
  {
    id: 23,
    lat: 46.73017,
    lng: -117.16941,
    title: "Room 154",
    sub: "Design Studio",
    floor: "1",
    type: "class",
    icon: mark_154
  },
  {
    id: 24,
    lat: 46.730509,
    lng: -117.169415,
    title: "Room 106",
    sub: "Design Studio",
    floor: "1",
    type: "class",
    icon: mark_106
  },
  {
    id: 25,
    lat: 46.73053,
    lng: -117.16962,
    title: "Room 120",
    sub: "CS Lab",
    floor: "1",
    type: "class",
    icon: mark_120
  },
  {
    id: 26,
    lat: 46.730675,
    lng: -117.16961,
    title: "Room 130",
    sub: "IGERT Lab",
    floor: "1",
    type: "class",
    icon: mark_130
  },
  {
    id: 27,
    lat: 46.730785,
    lng: -117.1696,
    title: "Room 136",
    sub: "AI Lab",
    floor: "1",
    type: "class",
    icon: mark_136
  },
  {
    id: 28,
    lat: 46.730769,
    lng: -117.169736,
    title: "Room 137",
    sub: "Jia Yu",
    floor: "1",
    type: "office",
    icon: mark_137
  },
  {
    id: 29,
    lat: 46.730735,
    lng: -117.169738,
    title: "Room 135",
    sub: "Zhe Dang",
    floor: "1",
    type: "office",
    icon: mark_135
  },
  {
    id: 30,
    lat: 46.730708,
    lng: -117.1697395,
    title: "Room 133",
    sub: "Jan Doppa",
    floor: "1",
    type: "office",
    icon: mark_133
  },
  {
    id: 31,
    lat: 46.73068,
    lng: -117.1697425,
    title: "Room 131",
    sub: "Empty Office",
    floor: "1",
    type: "office",
    icon: mark_131
  },
  {
    id: 32,
    lat: 46.73061,
    lng: -117.16975,
    title: "Room 127",
    sub: "Venera Arnaoudova",
    floor: "1",
    type: "office",
    icon: mark_127
  },
  {
    id: 33,
    lat: 46.73058,
    lng: -117.169755,
    title: "Room 125",
    sub: "Andy O'Fallon",
    floor: "1",
    type: "office",
    icon: mark_125
  },
  {
    id: 34,
    lat: 46.73055,
    lng: -117.169757,
    title: "Room 123",
    sub: "Yan Yan",
    floor: "1",
    type: "office",
    icon: mark_123
  },
  {
    id: 35,
    lat: 46.730518,
    lng: -117.169759,
    title: "Room 121",
    sub: "Diane Cook",
    floor: "1",
    type: "office",
    icon: mark_121
  },
  {
    id: 36,
    lat: 46.730558,
    lng: -117.169698,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 37,
    lat: 46.73077,
    lng: -117.169675,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 38,
    lat: 46.730745,
    lng: -117.169675,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 39,
    lat: 46.730455,
    lng: -117.16967,
    title: "Women's Restroom",
    floor: "1",
    sub: "(ADA)",
    type: "amenities",
    icon: mark_wrestroom
  },
  {
    id: 40,
    lat: 46.73049,
    lng: -117.169465,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 41,
    lat: 46.73051,
    lng: -117.169465,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 42,
    lat: 46.73053,
    lng: -117.169465,
    title: "Elevator",
    floor: "1",
    type: "elevator",
    icon: mark_elevator
  },
  {
    id: 43,
    lat: 46.73015,
    lng: -117.16948,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 44,
    lat: 46.73018,
    lng: -117.16948,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 45,
    lat: 46.73049,
    lng: -117.1693,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 46,
    lat: 46.73047,
    lng: -117.168902,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 47,
    lat: 46.73049,
    lng: -117.1689,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 48,
    lat: 46.73048,
    lng: -117.16884,
    title: "Elevator",
    floor: "1",
    type: "elevator",
    icon: mark_elevator
  },
  {
    id: 49,
    lat: 46.73054,
    lng: -117.16888,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
];

const EEME2_LOC = [
  {
    id: 36,
    lat: 46.730558,
    lng: -117.169698,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 37,
    lat: 46.73077,
    lng: -117.169675,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 38,
    lat: 46.730745,
    lng: -117.169675,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 39,
    lat: 46.730455,
    lng: -117.16967,
    title: "Women's Restroom",
    floor: "1",
    sub: "(ADA)",
    type: "amenities",
    icon: mark_wrestroom
  },
  {
    id: 40,
    lat: 46.73049,
    lng: -117.169465,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 41,
    lat: 46.73051,
    lng: -117.169465,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 42,
    lat: 46.73053,
    lng: -117.169465,
    title: "Elevator",
    floor: "1",
    type: "elevator",
    icon: mark_elevator
  },
  {
    id: 43,
    lat: 46.73015,
    lng: -117.16948,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 44,
    lat: 46.73018,
    lng: -117.16948,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 45,
    lat: 46.73049,
    lng: -117.1693,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 46,
    lat: 46.73047,
    lng: -117.168902,
    title: "Fire Extinguisher",
    floor: "1",
    type: "fire",
    icon: mark_extinguisher
  },
  {
    id: 47,
    lat: 46.73049,
    lng: -117.1689,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
  {
    id: 48,
    lat: 46.73048,
    lng: -117.16884,
    title: "Elevator",
    floor: "1",
    type: "elevator",
    icon: mark_elevator
  },
  {
    id: 49,
    lat: 46.73054,
    lng: -117.16888,
    title: "Fire Alarm",
    floor: "1",
    type: "fire",
    icon: mark_alarm
  },
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
      markersToUse = EEME2_LOC;
    }
    return markersToUse.map((marker) => {
      return (
        <Marker position={{
          lat: marker.lat,
          lng: marker.lng,

        }} onMarkerClick={() => {
          setSelectedLoc(marker);
        }} icon = {marker.icon} />
      )

    })
  }

  const renderResults = () => {
    let markersToUse;
    if (currentFloorPlan === EEME1) {
      markersToUse = EEME1_MAP_LOCS;
    } else {
      markersToUse = EEME2_LOC;
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
