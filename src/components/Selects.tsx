import AutocompleteInput from './AutocompleteInput';
import { HStack, Box, Text } from '@chakra-ui/react';

const Selects = () => {
  return (
    <HStack spacing={5}>
      <Box w='50%'>
        <AutocompleteInput />
      </Box>
      <Text>&</Text>
      <Box w='50%'>
        <AutocompleteInput />
      </Box>
    </HStack>
  );
};

export default Selects;
