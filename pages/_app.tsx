import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/provider';
import { ButtonStyles as Button } from '../components/common/ButtonStyles';
import * as Sentry from '@sentry/nextjs';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#2bd4db',
    800: '#153e75',
    700: '#2a69ac',
  },
  primary: '#2bd4db',
};

const components = {
  Button,
};

const theme = extendTheme({ colors, components });

Sentry.init({
  dsn: 'https://104ed71878e1414bb41de09451fed8ca@o1099971.ingest.sentry.io/6124840',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

/** This default export is required in a new `pages/_app.js` file.
 * the app entry point
 * @return {MyApp}
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
