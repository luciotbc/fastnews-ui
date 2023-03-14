import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const Hotjar = () => {
  return (
    <>
      <Script strategy="lazyOnload" id="hotjar">
        {`
 (function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:${siteMetadata.analytics.hotjarId},hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
      </Script>
    </>
  )
}

export default Hotjar
