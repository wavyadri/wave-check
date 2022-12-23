import AutocompleteInput from './AutocompleteInput';
import { HStack, VStack, Box, Text } from '@chakra-ui/react';

const Inputs = () => {
  return (
    <HStack spacing={5}>
      <Box w='50%'>
        <AutocompleteInput id={0} />
      </Box>
      <Text>&</Text>
      <Box w='50%'>
        <AutocompleteInput id={1} />
      </Box>
    </HStack>
  );
};

export default Inputs;
