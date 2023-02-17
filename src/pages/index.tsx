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
  body: string;
  contentSource: ContentSource;
  link: string;
  publishedAt: Date;
  summary: string;
  title: string;
}

export default function HomePage({ posts }: { posts: PostReportResponse }) {
  const truncateString = (post_text = '', maxLength = 40) =>
    post_text.split(' ').length > maxLength
      ? `${post_text.split(' ').splice(0, maxLength).join(' ')}…`
      : post_text;

  return (
    <Layout>
      <Seo />

      <main className='border-slate-200'>
        <div className='pt-8 pb-12 sm:pb-4'>
          <div className='mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0'>
            <h1 className='text-2xl font-bold leading-7 text-slate-900'>
              Ivaí.news
            </h1>
          </div>
          <div className='mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0'>
            <div className='divide-y divide-slate-100 sm:mt-4 '>
              {posts.posts.edges.map((post) => (
                <article
                  key={`post-${post.node.id}-title`}
                  aria-label={`post-${post.node.id}-title`}
                  className='pt-5 pb-3'
                >
                  <div className='flex flex-col'>
                    <h2
                      id={`episode-${post.node.id}-title`}
                      className='mt-2 text-lg font-bold text-slate-900'
                    >
                      <Link
                        className=' visited:text-purple-600 hover:text-pink-700 active:text-pink-900'
                        href={post.node.link}
                        target='_blank'
                      >
                        {post.node.title}
                      </Link>
                    </h2>
                    <div className='mt-3'>
                      <time className='text-left-xs font-mono text-slate-500'>
                        {moment(post.node.publishedAt).format(
                          'DD/MM/YYYY HH:mm'
                        )}
                      </time>
                    </div>
                    <p className='mt-3 text-base leading-7 text-slate-700'>
                      {post.node.summary
                        ? post.node.summary
                        : truncateString(post.node.body)}
                    </p>
                    <div className='mt-3'>
                      <Link
                        href={post.node.link}
                        className='text-sm font-bold leading-6 text-pink-500 visited:text-purple-600 hover:text-pink-700 active:text-pink-900'
                        aria-label={`Saiba mais ${post.node.title}`}
                        target='_blank'
                      >
                        {post.node.contentSource.name}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
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
              author
              body
              link
              publishedAt
              summary
              title
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
  });
  return {
    props: {
      posts: data || [],
    },
  };
}
