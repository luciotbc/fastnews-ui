import { gql } from '@apollo/client';
import moment from 'moment';
import Link from 'next/link';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import client from '@/api/apollo-client';

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PostNode {
  node: Post;
}

export interface PostConnection {
  totalCount: number;
  edges: PostNode[];
  pageInfo: PageInfo;
}

export interface PostReportResponse {
  posts: PostConnection;
}

export interface ContentSource {
  id: string;
  name: string;
}
export interface Post {
  id: string;
  title: string;
  link: string;
  summary: string;
  publishedAt: Date;
  contentSource: ContentSource;
}

export default function HomePage({ posts }: { posts: PostReportResponse }) {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='border-slate-200'>
        <div className='pt-8 pb-12 sm:pb-4 lg:pt-12'>
          <div className='lg:max-w-4xl'>
            <div className='mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0'>
              <h1 className='text-2xl font-bold leading-7 text-slate-900'>
                Ivaí.news
              </h1>
            </div>
            <div className='mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0'>
              <div className='divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100'>
                {posts.posts.edges.map((post) => (
                  <article
                    key={`post-${post.node.id}-title`}
                    aria-label={`post-${post.node.id}-title`}
                    className='py-10 sm:py-12'
                  >
                    <div className='flex flex-col items-start'>
                      <h2
                        id={`episode-${post.node.id}-title`}
                        className='mt-2 text-lg font-bold text-slate-900'
                      >
                        <Link href={post.node.link} target='_blank'>
                          {post.node.title}
                        </Link>
                      </h2>
                      <div>
                        <time className='text-right-xs font-mono leading-7 text-slate-500'>
                          {moment(post.node.publishedAt).format(
                            'DD/MM/YYYY HH:mm'
                          )}
                        </time>
                      </div>
                      <p className='mt-1 text-base leading-7 text-slate-700'>
                        {post.node.summary}
                      </p>
                      <div className='mt-4 flex items-center gap-4'>
                        <span
                          aria-hidden='true'
                          className='text-sm font-bold text-slate-400'
                        >
                          -
                        </span>
                        <Link
                          href={post.node.link}
                          className='flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900'
                          aria-label={`Saiba mais ${post.node.title}`}
                          target='_blank'
                        >
                          saiba mais no {post.node.contentSource.name}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(): Promise<{
  props: { posts: PostReportResponse };
}> {
  const { data } = await client.query({
    query: gql`
      query posts {
        posts {
          edges {
            node {
              id
              title
              link
              summary
              publishedAt
              author
              contentSource {
                name
                url
                bio
                __typename
              }
              __typename
            }
            __typename
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
            __typename
          }
        }
      }
    `,
  });
  return {
    props: {
      posts: data || [],
    },
  };
}
