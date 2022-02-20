import React, { useState, useEffect } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

function MapContainer(props) {
    const {
        nearbyLocations,
    } = props;



    return (
        <Map google={props.google} 
        zoom={14} containerStyle={{ position: 'relative' }}>

            
        </Map>
    );
}

export default GoogleApiWrapper((props) => ({ apiKey: props.apiKey }))(MapContainer);