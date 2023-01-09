/* global google */
import React, { useState } from 'react';
import {
  GoogleMap, withGoogleMap, Polygon
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useLoading } from '../../hooks/useLoading';
import { locationRequest } from '../../utils/requests';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAPS_API_KEY}`;

function SavePolygonsMap() {
  const [polygons, setPolygons] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState({
    // CN Tower default
    lat: 43.642558,
    lng: -79.387046
  });

  const onPolygonComplete = (polygon) => {
    // Get the coordinates of the polygon
    // const coordinates = polygon.getPath().getArray().map((latLng) => (
    //  { lat: latLng.lat(), lng: latLng.lng() }
    // ));

    // Save the coordinates to your MongoDB database
    // savePolygonToDatabase(coordinates);

    // Add the polygon to the state
    // const id = savePolygonToDatabase(coordinates);
    const id = nextId;

    // Add the polygon to the state
    console.log(polygon);
    setPolygons([...polygons, { id, polygon }]);
    setNextId(nextId + 1);
  };

  const onSearchChange = (value) => {
    setSearch(value);
  };

  const { request } = useLoading();

  const searchLocation = async () => {
    const response = await request(() => locationRequest(search));
    const { data } = response;
    console.log(data.results);
    setSelectedPlace(data.results[0].geometry.location);
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
            <input
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
        defaultZoom={8}
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
