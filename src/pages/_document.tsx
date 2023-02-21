import { Head, Html, Main, NextScript } from 'next/document'

import siteMetadata from '@/data/siteMetadata'

export default function Document() {
  return (
    <Html lang="pt" className="scroll-smooth">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content={siteMetadata.description} />

        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#fff" />
      </Head>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
