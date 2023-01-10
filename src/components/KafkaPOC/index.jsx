import { Center } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import {
  GoogleMap, Marker, withGoogleMap
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { socket } from '../../socket';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`;

function SavePolygonsMap() {
  const [selectedVehicles, setSelectedVehicles] = useState({});
  const processData = (data, selected) => {
    const processedData = {};
    if (data) {
    // Update existing ids with new data
      Object.keys(selected).forEach((id) => {
        console.log(data[id].timestamp, selected[id].timestamp);
        if (data[id].timestamp !== selected[id].timestamp) {
          console.log('work aguthu');
        }
        if (data[id]) {
          processedData[id] = data[id];
        }
      });

      // Fill remaining keys with new data
      const remaining = 10 - Object.keys(processedData).length;
      const newIds = Object.keys(data).filter((id) => !selected[id]).slice(0, remaining);
      newIds.forEach((id) => {
        processedData[id] = data[id];
      });
    }

    return processedData;
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });
    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });
    socket.on('event', (data) => {
      setSelectedVehicles((previous) => processData(data, previous));
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('custom event');
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 41.397, lng: -87 }}
    >
      {Object.keys(selectedVehicles).map((vehicle) => (
        <Marker
          title={vehicle}
          key={vehicle}
          position={{
            lat: parseFloat(selectedVehicles[vehicle].lat, 10),
            lng: parseFloat(selectedVehicles[vehicle].lon, 10)
          }}
        />
      ))}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(SavePolygonsMap));

export default function GlobalfencePage() {
  return (
    <Center>
      <div style={{ width: '80%', height: '400px' }}>
        <MapWrapped
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </Center>
  );
}
