import React from 'react';
import Header from './components/Header';

import { Box } from '@chakra-ui/react';
import Selects from './components/Selects';

function App() {
  return (
    <Box my={5} mx={20}>
      <Header />
      <Selects />
    </Box>
  );
}

export default App;
