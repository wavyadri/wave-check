import Header from './components/Header';
import Inputs from './components/Inputs';
import Graph from './components/Graph';
import Footer from './components/Footer';

import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box my={5} mx={10}>
      <Header />
      <Inputs />
      <Graph />
      <Footer />
    </Box>
  );
}

export default App;
