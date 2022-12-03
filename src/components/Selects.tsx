import React, { useState } from 'react';
import { HStack, Box, Text, Input } from '@chakra-ui/react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

declare var process: {
  env: {
    REACT_APP_API_KEY: string;
  };
};
const libraries: Libraries = ['places'];

const Selects = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onLoad = (auto: google.maps.places.Autocomplete) => {
    console.log('autooo', auto);
    setAutocomplete(auto);
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <HStack spacing={5}>
      <Box w='50%'>
        <Autocomplete>
          <Input variant='flushed' />
        </Autocomplete>
      </Box>
      <Text>&</Text>
      <Box w='50%'>
        <Autocomplete
          className='autocomplete'
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
    </HStack>
  ) : (
    <></>
  );
};

export default Selects;
