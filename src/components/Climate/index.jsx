import { TextInput } from '@mantine/core';
import React, { useState } from 'react';
import {
  GoogleMap, withGoogleMap, InfoWindow
} from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import PlacesAutocomplete from 'react-places-autocomplete';
// import { socket } from '../../socket';
import { useLoading } from '../../hooks/useLoading';
import { climateRequest, locationRequest, climateWithCoordinateRequest } from '../../utils/requests';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_MAPS_API_KEY}`;

function SavePolygonsMap() {
  const [search, setSearch] = useState('');
  const [selectedPlace, setSelectedPlace] = useState({
    lat: 36,
    lng: -119
  });
  const [weather, setWeather] = useState({});
  const [infoWindowPosition, setInfoWindowPosition] = useState({});
  const [infoWindowContent, setInfoWindowContent] = useState('');
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const onSearchChange = (value) => {
    setSearch(value);
  };

  const { request } = useLoading();

  const getClimate = async (place) => {
    const placeFormatted = place.split(',')[0];
    const response = await request(() => climateRequest(placeFormatted));
    setWeather(response.data);
  };

  const getClimateForCoordinates = async (place) => {
    console.log('place fe', place);
    const response = await request(() => climateWithCoordinateRequest(place));
    console.log('res fe', response);
    setWeather(response.data);
  };

  const searchLocation = async () => {
    const response = await request(() => locationRequest(search));
    const { position, polygonCords } = response.data;

    setSelectedPlace(position.results[0].geometry.location);

    const polygonCord = polygonCords[0];
    console.log(polygonCord);
  };

  const onSelectPlace = (place) => {
    setSearch(place);
    getClimate(place);
    searchLocation();
  };

  const onMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setInfoWindowPosition({ lat, lng });
    setShowInfoWindow(true);
    const place = `${lat}, ${lng}`;
    setInfoWindowContent(place);
    await getClimateForCoordinates({ lat, lng });
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
      <div>
        {weather.main ? (
          <div>
            <h1>
              The current temperature in
              {' '}
              {weather.name}
              {' '}
              is
              {' '}
              {weather.main.temp}
              °F
            </h1>
            <h2>
              Weather conditions:
              {weather.weather[0].main}
            </h2>
          </div>
        ) : (
          <h4>Enter valid place</h4>
        )}
      </div>
      <GoogleMap
        id="map"
        defaultZoom={5}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={selectedPlace ? {
          lat: selectedPlace.lat, lng: selectedPlace.lng
        } : { lat: -34.397, lng: 150.644 }}
        onClick={onMapClick}
      />
      {showInfoWindow && (
        <InfoWindow
          position={infoWindowPosition}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <div>
            {infoWindowContent}
          </div>
        </InfoWindow>
      )}
    </>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(SavePolygonsMap));

export default function GlobalfencePage() {
  return (
    <div style={{ width: '80%', height: '500px' }}>
      <MapWrapped
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
