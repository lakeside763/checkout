import { Container, Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link'
import products from '../../products.json'

const Products = () => {
  return (
    <Container maxW="container" px={{ base: '8', xl: '40'}}>
      <Box mt="20" mb="40">
        <SimpleGrid columns={[1, null, 2, null, 4]} spacing={10}>
          {
            products.map((item) => (
              <Box key={item.id} w={{ base: '100%'}} borderWidth="1px" borderRadius="md">
                <Link href={`/${item.id}`}>
                  <a>
                    <Image src={`${item.image}`} width='400px' height='400px' alt='Product image'/>
                    <Box p='6'>
                      <Heading fontSize='sm'>Sneaker</Heading>
                    </Box>
                  </a>
                </Link>

              </Box>
            ))
          }

        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default Products

