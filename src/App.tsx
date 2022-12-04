import React from 'react';
import Header from './components/Header';

import { Box } from '@chakra-ui/react';
import Inputs from './components/Inputs';

function App() {
  return (
    <Box my={5} mx={20}>
      <Header />
      <Inputs />
    </Box>
  );
}

export default App;
