import { gql } from '@apollo/client'
import Head from 'next/head'

import client from '@/api/apollo-client'
import Post from '@/components/Post'
import siteMetadata from '@/data/siteMetadata'
import { IPostReportResponse } from '@/interfaces'

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
  const { data } = await client.query({
    query: gql`
      query posts {
        posts {
          edges {
            node {
              id
              author
              body
              link
              publishedAt
              summary
              title
              imageUrl
              contentSource {
                name
                url
                bio
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    `,
  })
  return {
    props: {
      posts: data || [],
    },
  }
}
