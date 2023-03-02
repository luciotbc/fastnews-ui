import { ApolloError } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { initializeApollo } from '@/api/apolloClient'
import Post from '@/components/Post'
import siteMetadata from '@/data/siteMetadata'
import { IPost } from '@/interfaces'
import POSTS from '@/queries/posts.graphql'

interface IPageInfo {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

interface IPostEdge {
  node: IPost
}
interface IPostConnection {
  edges: IPostEdge[]
  pageInfo: IPageInfo
}

export interface IPostsResponse {
  posts: IPostConnection
}

interface IPosts {
  error?: ApolloError | null
  loading: boolean
  pageInfo: IPageInfo
  posts: IPost[]
}

interface IPostsVariables {
  first: number
  after?: string
  last?: number
  before?: string
}

interface IProps {
  data?: IPosts
}

async function getPosts(variables: IPostsVariables): Promise<IPosts> {
  const apolloClient = initializeApollo()
  const { loading, error, data } = await apolloClient.query<IPostsResponse, IPostsVariables>({
    query: POSTS,
    variables: variables,
  })
  const posts = data.posts.edges?.map((edge) => edge.node) || []
  return {
    posts: posts,
    pageInfo: data.posts.pageInfo,
    loading,
    error: error || null,
  }
}

const Home: React.FC<IPosts> = ({ posts }: IPosts): JSX.Element => {
  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle}</title>
      </Head>
      <main>
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<IProps> {
  const postResponse = await getPosts({ first: 80 })
  return { props: postResponse } as IProps
}

export default Home
