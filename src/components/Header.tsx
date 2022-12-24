import { useEffect, useState } from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import '../styles.css';

const Header = () => {
  const [time, setTime] = useState(new Date().toUTCString().slice(17, 25));
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toUTCString().slice(17, 25));
    }, 1000);
  }, []);
  return (
    <>
      <HStack fontSize='5em' justifyContent='space-between'>
        <Text>W</Text>
        <Text>A</Text>
        <Text>V</Text>
        <Text>E</Text>
      </HStack>
      <HStack fontSize='2em' justifyContent='space-between'>
        <Text>C</Text>
        <Text>H</Text>
        <Text>E</Text>
        <Text>C</Text>
        <Text>K</Text>
      </HStack>
      <HStack
        spacing={2}
        justifyContent='center'
        w='100%'
        backgroundColor='black'
        color='white'
        my='1rem'
      >
        <TimeIcon />
        <Text>{time}</Text>
        <Text>UTC</Text>
      </HStack>
    </>
  );
};

export default Header;
