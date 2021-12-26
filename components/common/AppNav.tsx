import React from 'react';
import { Box, Container, Flex, Heading, Menu, MenuButton, SimpleGrid, Spacer, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

const AppNav = () => {
  return (
    <Container maxW="container" py="2" px={{ base: '8', xl: '40' }} bg="#2bd4db">
      <SimpleGrid>
        <Flex flexDir="row" mt="1">
          <Box>
            <Link href="/">
              <a>
                <Heading>
                  <Flex color="#0c1164">
                    <Text fontWeight="bold">Checkout</Text>
                    <Text fontWeight="light">.com</Text>
                  </Flex>
                </Heading>
              </a>
            </Link>
          </Box>
          <Spacer />
          <Menu>
            <MenuButton ml="5">
              <Button>
                <FiShoppingCart />
                <Text ml="3">Cart</Text>
              </Button>
            </MenuButton>
          </Menu>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default AppNav;

// #D3F4ED
