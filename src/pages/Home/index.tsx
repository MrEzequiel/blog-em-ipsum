import { FC } from 'react'
import { MdLink } from 'react-icons/md'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import getBlogList from '../../functions/getBlogList'
import IBlog from '../../interfaces/IBlog'

const Home: FC = () => {
  const {
    data: blogList,
    isError,
    isLoading,
    error
  } = useQuery<IBlog[], Error>('blog-list', getBlogList)

  return (
    <>
      <h1 className="font-mono text-5xl italic font-bold text-gray-100 mb-4">
        Blogs
      </h1>

      {isLoading && <p className="text-lg text-gray-400">Loading...</p>}

      {isError && (
        <p className="text-lg">
          Error fetching blog list:{' '}
          <span className="text-red-400 font-light">{error.message}</span>
        </p>
      )}

      {!isLoading && blogList && (
        <ul className="flex flex-col gap-4">
          {blogList.map(blog => (
            <li key={blog.id} className="flex flex-col">
              <h2>
                <Link
                  to={`blog/${blog.id}`}
                  className="capitalize leading-5 text-gray-300 flex items-center gap-2 hover:underline hover:text-gray-100 w-fit"
                >
                  <span className="first-letter:uppercase">{blog.title}</span>

                  <MdLink className="text-gray-600" />
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Home
