import Head from 'next/head'
import React from 'react'

import siteMetadata from '@/data/siteMetadata'

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle}</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Estamos dando uma pausa nas publicações.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Agradecemos a todos que acompanharam nosso trabalho.
          </p>
        </div>
      </main>
    </>
  )
}

export default Home
