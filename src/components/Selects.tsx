import React, { useState, useEffect } from 'react';
import { HStack, Box, Text } from '@chakra-ui/react';
import {
  Select,
  AsyncSelect,
  CreatableSelect,
  AsyncCreatableSelect,
  useChakraSelectProps,
} from 'chakra-react-select';
// import Select from 'react-select';

const Selects = () => {
  return (
    <HStack spacing={5}>
      <Box w='50%'>
        <AsyncSelect
          variant='flushed'
          placeholder='Search a surf spot...'
          cacheOptions
          defaultOptions={false}
          noOptionsMessage={() => 'No results found'}
        ></AsyncSelect>
      </Box>
      <Text>&</Text>
      <Box w='50%'>
        <Select
          variant='flushed'
          placeholder='Search another surf spot...'
        ></Select>
      </Box>
    </HStack>
  );
};

export default Selects;
