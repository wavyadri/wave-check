import React, { useEffect, useState } from 'react';
import { HStack, Text, Flex, Center } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';

const TIME = new Date().toUTCString();

const Header = () => {
  const [time, setTime] = useState(new Date().toUTCString().slice(17, 25));
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toUTCString().slice(17, 25));
    }, 1000);
  }, []);
  return (
    <HStack justifyContent='space-between'>
      <div>WAVE CHECK</div>
      <HStack spacing={2}>
        <TimeIcon />
        <Text>{time}</Text>
        <Text>UTC</Text>
      </HStack>
    </HStack>
  );
};

export default Header;
