import React, { useState, useEffect } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import * as parkData from "./data/houstonBikeParks.json"
import { GrBike } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import "./index.css";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 29.749907, 
    longitude: -95.358421,
    width: "100vw",
    height: "100vh",
    zoom: 10
  })

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    }
  }, [])

  return (
    <>
      <ReactMapGL
      {...viewport} 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => {setViewport(viewport)}}
      mapStyle="mapbox://styles/v-walker/ckwi72nw55af715n0mnk305np">
        {parkData.parks.map((park) => {
          return (
          <Marker key={park.park_id} latitude={park.latitude} longitude={park.longitude}>
            <Button className="marker-btn" onClick={(e) => {
              e.preventDefault();
              setSelectedPark(park);
            }}>
              <GrBike></GrBike>
            </Button>
          </Marker>
          )
        })}
        {selectedPark ? (
          <Popup className="mapboxgl-popup-content"
          latitude={selectedPark.latitude}
          longitude={selectedPark.longitude}
          onClose={() => {
            setSelectedPark(null);
          }}>
            <div>
              <h4>{selectedPark.park_name}</h4>
              <hr />
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                    <img className="park-img " src={selectedPark.image} alt={`snapshot of ${selectedPark.park_name}`}></img>
                    </div>
                  <p className="col-12 mt-3">
                    {selectedPark.description} <br /><br />
                    <b>Trail length: </b> {selectedPark.trail_length} miles
                  </p>
                  </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
}

export default App;
