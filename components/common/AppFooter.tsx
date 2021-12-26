import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';

const AppFooter = () => {
  return (
    <Container maxW="container" py="2" px={{ base: '8', xl: '40' }}>
      <Box mt="20" borderTop="1px" borderColor="#f2f2f2" pt="3" pb="5">
        <Text>Checkout Inc.</Text>
      </Box>
    </Container>
  );
};

export default AppFooter;
