import { ApolloError } from '@apollo/client'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { initializeApollo } from '@/api/apolloClient'
import Post from '@/components/Post'
import siteMetadata from '@/data/siteMetadata'
import { IPost } from '@/interfaces'
import GET_POSTS from '@/queries/posts.graphql'

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
  after?: string | null
  last?: number | null
  before?: string | null
}

interface IProps {
  data?: IPosts
}

async function getPosts(variables: IPostsVariables): Promise<IPosts> {
  const apolloClient = initializeApollo()
  const { loading, error, data } = await apolloClient.query<IPostsResponse, IPostsVariables>({
    query: GET_POSTS,
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

const Home: React.FC<IPosts> = (props: IPosts): JSX.Element => {
  const [posts, setPosts] = useState(props.posts || [])
  const [pageInfo, setPageInfo] = useState(props.pageInfo || [])

  const getMorePosts = async () => {
    const endCursor = pageInfo.endCursor || null
    const postResponse = await getPosts({ first: 50, after: endCursor })
    setPosts((post) => [...post, ...postResponse.posts])
    setPageInfo(postResponse.pageInfo)
  }

  return (
    <>
      <Head>
        <title>{siteMetadata.headerTitle}</title>
      </Head>
      <main>
        <div>
          <InfiniteScroll
            dataLength={posts.length}
            next={getMorePosts}
            hasMore={pageInfo.hasNextPage}
            loader={<h3> Carregando mais...</h3>}
            endMessage={<h4>Todas as notícias foram vistas</h4>}
            style={{ overflow: 'hidden' }}
          >
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<IProps> {
  const postResponse = await getPosts({ first: 50 })
  return { props: postResponse } as IProps
}

export default Home
