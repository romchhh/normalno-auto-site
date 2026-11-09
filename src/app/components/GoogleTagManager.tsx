import Script from 'next/script'
import { GOOGLE_ADS_ID, GOOGLE_ADS_CONVERSION_SEND_TO, GTM_ID } from '@/lib/gtm'

/** GTM + Google Ads gtag (conversion: Заявка на автолизинг — сайт). */
export function GoogleTagManager() {
  return (
    <>
      <Script
        id="google-ads-gtag-js"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script id="gtm-and-ads-bootstrap" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');

          window.gtag_report_conversion = function(url) {
            var callback = function () {
              if (typeof url != 'undefined' && url) {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              'send_to': '${GOOGLE_ADS_CONVERSION_SEND_TO}',
              'event_callback': callback
            });
            return false;
          };

          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </>
  )
}

export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
