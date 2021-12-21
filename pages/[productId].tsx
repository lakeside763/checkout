import {
  Container, Flex, Box, Heading, SimpleGrid, Text, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react'
import AppNav from '../components/common/AppNav';
import Image from 'next/image';
import { FiStar} from 'react-icons/fi';
import products from '../products.json';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ProductProps {
  product: {
    id: string,
    title: string,
    description: string,
    image: string,
    price: string,
  }
}

const ProductId = ({ product }: ProductProps) => {
  const { id, title, description, image, } = product;
  const { isOpen, onOpen, onClose } = useDisclosure
  return (
    <Box>
      <AppNav />
      <Container maxW='container' px={{ base: '8', xl: '40'}} pt='14'>
        <Flex justifyContent='flex-start' wrap={{ base: 'wrap', md: 'nowrap'}}>
          <Box w='500px'>
            <Image src={`${image}`} alt={title} width='500px' height='500px' />
          </Box>
          <Box p='20'>
            <Heading as='h4' fontSize='large'>{title}</Heading>
            <Text mt='10'>{description}</Text>
          </Box>
        </Flex>

        <SimpleGrid columns={[1, null, 2]} spacing='5'>
          <Box borderWidth='1px' borderRadius='10' p='5'>
            <Text>Customer Reviews</Text>
          </Box>
          <Box borderWidth='1px' borderRadius='10' p='5'>
            <Heading as='h4' fontSize='large'>Review this product</Heading>
            <Text>Share your thoughts with other customers</Text>

            <Button mt='5'>Write a customer review</Button>
          </Box>
        </SimpleGrid>

        <Box borderWidth='1px' borderRadius='10' mt='5'>
          <Flex p='10'>
            <Box w='100px'>

            </Box>
            <Box w='calc(100% - 120px)' ml='20px'>
              <Flex>
                <FiStar /><FiStar /><FiStar />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

export default ProductId

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const product = products.find(({ id }) => id === params.productId);
  return {
    props: {
      product
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}
