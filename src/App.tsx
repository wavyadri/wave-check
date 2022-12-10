import React from 'react';
import Header from './components/Header';

import { Box } from '@chakra-ui/react';
import Inputs from './components/Inputs';
import Graphs from './components/Graphs';

function App() {
  return (
    <Box my={5} mx={20}>
      <Header />
      <Inputs />
      <Graphs />
    </Box>
  );
}

export default App;
