import Link from 'next/link'

import siteMetadata from '@/data/siteMetadata'

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`🄯 ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</Link>
          <div>{` • `}</div>
          <Link href={siteMetadata.statusUrl}>status</Link>
          {/* <Link href="/">{siteMetadata.title}</Link> */}
          {/* <Link href={siteMetadata.authorUrl}>{siteMetadata.author}</Link> */}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Feito com ❤️ ☕ 🍀 🤖</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
