/* global google */
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

import Map from './DrawMap';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=${process.env.REACT_APP_MAPS_API_KEY}`;

export function App() {
  const [center, setCenter] = useState({
    // CN Tower default
    lat: 43.642558,
    lng: -79.387046
  });

  const [insideFence, setInsideFence] = useState(false);
  const [previousPolygon, setPreviousPolygon] = useState(null);
  const [fence, setFence] = useState(null);
  const [watchID, setWatchID] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const playAlarm = () => {
    const audioElement = new Audio('/alarm.mp3');
    audioElement.play();
  };

  const getCurrentPosition = () => new google.maps.LatLng(center.lat, center.lng);

  const checkGeofence = (newFence) => {
    if (!newFence) {
      setInsideFence(false);
      return;
    }

    const insideFenceVar = google.maps.geometry.poly.containsLocation(
      getCurrentPosition(),
      newFence
    );

    if (!insideFenceVar && insideFence) {
      alert('You have left the fence!');
      playAlarm();
    }

    setInsideFence(insideFenceVar);
  };

  const getLocation = (position) => {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    setLastFetched(position.timestamp);

    checkGeofence(fence);
  };

  const doneDrawing = (polygon) => {
    if (previousPolygon) {
      previousPolygon.setMap(null);
    }

    setPreviousPolygon(polygon);
    const newFence = new google.maps.Polygon({
      paths: polygon.getPaths()
    });
    setFence(newFence);
    checkGeofence(newFence);
  };

  const watchLocation = () => {
    if ('geolocation' in navigator) {
      const geoOptions = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      };

      setWatchID(
        navigator.geolocation.watchPosition(getLocation, null, geoOptions)
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const unwatchLocation = () => {
    if ('geolocation' in navigator && watchID) {
      navigator.geolocation.clearWatch(watchID);
    }
  };

  useEffect(() => {
    watchLocation();
    return () => unwatchLocation();
  }, []); // empty array ensures this only runs on mount and unmount

  return (
    <div className="App">
      <div className="App-header">
        <h1>Geofence</h1>
        <p>
          <Moment fromNow>{lastFetched}</Moment>
        </p>
        <p>{insideFence ? 'Inside fence' : 'Outside fence'}</p>
        <Map
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '400px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={center}
          doneDrawing={doneDrawing}
        />
      </div>

    </div>
  );
}
