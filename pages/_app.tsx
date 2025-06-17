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
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3XCWJ06NVF');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

// 关键：传入 nextI18NextConfig
export default appWithTranslation(MyApp, nextI18NextConfig);