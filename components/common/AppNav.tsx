import { Box, Container, Flex, Heading, Menu, MenuButton, SimpleGrid, Spacer, Text } from "@chakra-ui/react"
import Link from 'next/link'

const AppNav = () => {
  return (
    <Container maxW="container" py="2" px={{ base: '8', xl: '40'}} bg="#D3F4ED">
      <SimpleGrid>
        <Flex flexDir="row" mt="1">
          <Box>
            <Link href='/'>
              <a>
                <Heading>
                <Flex>
                  <Text fontWeight="bold">Checkout</Text>
                  <Text fontWeight="light">.com</Text>
                </Flex>
              </Heading>
              </a>
            </Link>
          </Box>
          <Spacer />
          <Menu>
            <MenuButton>Products</MenuButton>
          </Menu>
        </Flex>
      </SimpleGrid>
    </Container>
  )
}

export default AppNav;
