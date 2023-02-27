import Image from 'next/image'
import Link from 'next/link'

import { IPost } from '@/interfaces'
import formatDate from '@/lib/utils/formatDate'

const Post = (props: { post: IPost }): JSX.Element => {
  const { post } = props

  if (!post) return <div />
  return (
    <article key={`post-${post.id}-title`} aria-label={`post-${post.id}-title`}>
      <div className="py-4">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              <Link
                className=" visited:text-gray-300 hover:text-pink-700 active:text-pink-900"
                href={post.link || '/'}
                target="_blank"
                aria-label={`Leia mais "${post.title}"`}
              >
                {post.title}
              </Link>
            </h2>
          </div>
          <div className="prose max-w-none text-gray-500 line-clamp-3 dark:text-gray-400">
            {post.body}
          </div>
          <div className="text-right text-sm text-gray-500 line-clamp-3 dark:text-gray-400">
            {`publicado ${formatDate(post.publishedAt)}`}
          </div>
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt="Ivaí.news Logo"
              width={300}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          )}
          <div className="text-base font-medium leading-6">
            <Link
              href={post.link || '/'}
              target="_blank"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Leia mais "${post.title}"`}
            >
              Leia mais no {post.contentSource.name} &rarr;
            </Link>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
    </article>
  )
}

export default Post
