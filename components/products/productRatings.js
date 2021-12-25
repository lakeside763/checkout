import {Box, Flex, Heading, Progress, Text} from '@chakra-ui/react';
import {FiStar} from 'react-icons/fi';
import {useProduct} from '../../hooks/useProduct';

const ProductRatings = () => {
  const {ratings, averageRating, totalReviews} = useProduct();

  return (
    <Box borderWidth="1px" borderRadius="10" p="5">
      <Heading as="h4" fontSize="medium">
        Product Ratings
      </Heading>
      <Flex mt="2" wrap={{base: 'wrap-reverse', lg: 'nowrap'}}>
        <Box>
          {ratings &&
            ratings.map(({count, slug, percentage}) => (
              <Flex mb="3" key={slug}>
                <Text mr="3" fontSize="12px">
                  {slug.replace('_', ' ')}
                </Text>
                <Box width="250px" mt="2" mr="5">
                  <Progress colorScheme="green" size="xs" value={percentage} />
                </Box>
                <Text fontSize="12px" p={[0, 1]} borderRadius="5" borderWidth="1px">
                  {percentage}%
                </Text>
              </Flex>
            ))}
        </Box>

        <Box ml={{base: '0', md: '6'}} mb="5">
          <Flex>
            <Heading fontSize="6xl" fontWeight="normal">
              {averageRating.toFixed(1)}
            </Heading>
            <Text ml="2" mt="40px">
              out of {totalReviews}
            </Text>
          </Flex>
          <Flex mt="6px">
            {Array(5)
                .fill('')
                .map((_, i) => (
                  <FiStar
                    fontSize="16"
                    key={i}
                    fill={i < Math.round(averageRating) ? '#f59e0c' : '#fff'}
                    color={i < Math.round(averageRating) ? '#f59e0c' : '#000'}
                  />
                ))}
          </Flex>
          <Text>Reviews</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductRatings;
