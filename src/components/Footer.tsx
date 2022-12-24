import { Center, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Center>
      created by
      <Link isExternal href='https://github.com/wavyadri' ml='3px'>
        wavyadri
      </Link>
    </Center>
  );
};

export default Footer;
