import { whiten } from '@chakra-ui/theme-tools';

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},

  // styles for different sizes('sm', 'md', 'lg')
  sizes: {},

  // styles for different visual variants('outline' 'solid')
  variants: {
    primary: {
      bg: 'primary',
      color: '#0c1164',
      _hover: {
        bg: whiten('primary', 20),
        color: '#1e2380',
      },
    },
  },

  // default values for size and variant
  defaultProps: {},
};
