import siteMetadata from '@/data/siteMetadata'

import GA from './GoogleAnalytics'
import Hotjar from './Hotjar'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
      {isProduction && siteMetadata.analytics.hotjarId && <Hotjar />}
    </>
  )
}

export default Analytics
