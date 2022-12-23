import React from 'react';
import Header from './components/Header';

import { Box } from '@chakra-ui/react';
import Inputs from './components/Inputs';
import Graph from './components/Graph';

function App() {
  return (
    <Box my={5} mx={10}>
      <Header />
      <Inputs />
      <Graph />
    </Box>
  );
}

export default App;
