import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle}</title>
      </Head>
      <main>
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 underline">Teste tailwind</h1>
          <p>
            Get started by editing&nbsp;
            <code>src/pages/index.tsx</code>
          </p>
        </div>
      </main>
    </>
  )
}
