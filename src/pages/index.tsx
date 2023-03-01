import Head from 'next/head'

import { initializeApollo } from '@/api/apolloClient'
import Post from '@/components/Post'
import siteMetadata from '@/data/siteMetadata'
import { IPostsResponse } from '@/interfaces'
import POSTS from '@/queries/posts.graphql'

export default function Home({ posts }: { posts: IPostsResponse }) {
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
  props: { posts: IPostsResponse }
}> {
  const variables = {
    first: 80,
  }
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query({ query: POSTS, variables: variables })

  return {
    props: {
      posts: data || [],
    },
  }
}
