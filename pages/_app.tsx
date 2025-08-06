import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-3XCWJ06NVF"
        onLoad={() => {
          console.log('Google Analytics script loaded successfully');
        }}
        onError={(e) => {
          console.error('Google Analytics script failed to load:', e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3XCWJ06NVF', {
              page_title: document.title,
              page_location: window.location.href,
            });
            
            console.log('Google Analytics initialized');
          `,
        }}
      />
      {/* Additional verification for Google Search Console */}
      <Script
        id="ga-verification"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Ensure GA is available for verification
            if (typeof gtag !== 'undefined') {
              console.log('GA verification: gtag function is available');
            } else {
              console.log('GA verification: gtag function not available');
            }
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

// 关键：传入 nextI18NextConfig
export default appWithTranslation(MyApp, nextI18NextConfig);