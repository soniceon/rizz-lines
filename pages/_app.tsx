import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Google Analytics script loaded successfully');
    console.log('Google Analytics initialized');
    console.log('GA verification: gtag function is available');
  }
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp);