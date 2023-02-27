import Head from 'next/head'

import client from '@/api/apollo-client'
import Post from '@/components/Post'
import siteMetadata from '@/data/siteMetadata'
import { IPostReportResponse } from '@/interfaces'
import POSTS from '@/queries/posts.graphql'

export default function Home({ posts }: { posts: IPostReportResponse }) {
  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle}</title>
      </Head>
      <main>
        <div>
          {posts.posts.edges.map((postEdge) => (
            <Post key={postEdge.node.id} post={postEdge.node} />
          ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(): Promise<{
  props: { posts: IPostReportResponse }
}> {
  const { data } = await client.query({ query: POSTS })
  return {
    props: {
      posts: data || [],
    },
  }
}
