/* global google */
import { TextInput } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import {
  GoogleMap, withGoogleMap, Polygon
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import PlacesAutocomplete from 'react-places-autocomplete';
import { socket } from '../../socket';
import { useLoading } from '../../hooks/useLoading';
import { locationRequest } from '../../utils/requests';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`;

function SavePolygonsMap() {
  useEffect(() => {
    console.log('here');
    socket.on('connect', () => {
      console.log('connected to server');
    });
    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });
    socket.on('event', (data) => {
      console.log(`received custom event: ${data}`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('custom event');
    };
  }, []);
  const [polygons, setPolygons] = useState([]);
  let nextId = 1;
  const [search, setSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState({
    lat: 36,
    lng: -119
  });

  const onPolygonComplete = (polygon) => {
    const id = nextId;

    polygon.setPath(
      polygon.getPath().getArray().map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng()
      }))
    );

    setPolygons([...polygons, { id, polygon }]);
    nextId += 1;
  };

  const onSearchChange = (value) => {
    setSearch(value);
  };

  const { request } = useLoading();

  const searchLocation = async () => {
    const response = await request(() => locationRequest(search));
    const { position, polygonCords } = response.data;

    setSelectedPlace(position.results[0].geometry.location);

    const polygonCord = polygonCords[0];
    if (polygonCord.geojson.type === 'Polygon') {
      polygonCord.geojson.coordinates.forEach((polycordmini) => {
        const id = nextId;
        const polygon = new google.maps.Polygon({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        polygon.setPath(
          polycordmini.map((cord) => ({
            lat: cord[1],
            lng: cord[0]
          }))
        );
        polygon.setVisible(true);
        setPolygons((prev) => [...prev, { id, polygon }]);
        nextId += 1;
      });
    } else if (polygonCord.geojson.type === 'MultiPolygon') {
      polygonCord.geojson.coordinates.forEach((polycordmini) => {
        polycordmini.forEach((cord) => {
          const id = nextId;
          const polygon = new google.maps.Polygon({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#FF0000',
            fillOpacity: 0.35
          });
          polygon.setPath(
            cord.map((c) => ({
              lat: c[1],
              lng: c[0]
            }))
          );
          polygon.setVisible(true);
          setPolygons((prev) => [...prev, { id, polygon }]);

          nextId += 1;
        });
      });
    }
  };

  const onSelectPlace = (place) => {
    setSearch(place);
    searchLocation();
  };
  return (
    <>
      <PlacesAutocomplete
        value={search}
        onChange={onSearchChange}
        onSelect={onSelectPlace}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <>
            <TextInput
              my={15}
              {...getInputProps({
                placeholder: 'Search for a place ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </PlacesAutocomplete>
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={selectedPlace ? {
          lat: selectedPlace.lat, lng: selectedPlace.lng
        } : { lat: -34.397, lng: 150.644 }}
      >
        <DrawingManager
          defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon']
            },
            polygonOptions: {
              clickable: true,
              editable: true
            }
          }}
          onPolygonComplete={onPolygonComplete}
        />
        {polygons.map(({ id, polygon }) => (
          <Polygon key={id} paths={polygon.getPath()} />
        ))}
      </GoogleMap>
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(SavePolygonsMap));

export default function GlobalfencePage() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <MapWrapped
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
