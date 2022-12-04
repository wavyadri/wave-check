import React, { useState, useContext } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { PlacesContext, ContextInterface } from '../context/PlacesProvider';

// needs to be delcared outside of component
const libraries: Libraries = ['places'];

declare var process: {
  env: {
    REACT_APP_API_KEY: string;
  };
};

type AutocompleteInputProps = {
  id: number;
};

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const { places, setPlaces } = useContext(PlacesContext) as ContextInterface;
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const newPlace = autocomplete.getPlace();
      setPlaces({
        ...places,
        [props.id]: {
          lat: newPlace.geometry?.location?.lat(),
          lng: newPlace.geometry?.location?.lng(),
        },
      });
    }
  };

  const onLoad = (auto: google.maps.places.Autocomplete) => {
    if (!autocomplete) {
      setAutocomplete(auto);
    }
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  console.log(places);
  return isLoaded ? (
    <Box w='50%'>
      <Autocomplete
        onLoad={(a) => onLoad(a)}
        onPlaceChanged={() => onPlaceChanged()}
      >
        <Input
          type='text'
          variant='flushed'
          placeholder='Customized your placeholder'
        />
      </Autocomplete>
    </Box>
  ) : (
    <></>
  );
};

export default AutocompleteInput;
