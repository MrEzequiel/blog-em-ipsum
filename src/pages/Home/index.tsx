import { FC, useState } from 'react'
import { MdArrowBack, MdArrowForward, MdLink } from 'react-icons/md'
import { useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import getBlogList from '../../functions/getBlogList'
import IBlog from '../../interfaces/IBlog'

const Home: FC = () => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: blogList,
    isError,
    isLoading,
    isFetching,
    error
  } = useQuery<IBlog[], Error>(
    ['blog-list', currentPage],
    () => getBlogList(currentPage),
    {
      staleTime: 1000 * 60 * 1, // 1 minute
      keepPreviousData: true
    }
  )

  const handleMouseEnterNextPage = () => {
    if (currentPage === 10) return
    queryClient.prefetchQuery(['blog-list', currentPage + 1], () =>
      getBlogList(currentPage + 1)
    )
  }

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

      {blogList && blogList.length > 0 && (
        <div className="flex items-center justify-between mt-8">
          <button
            className="flex items-center py-2 px-4 bg-gray-600 gap-2 disabled:opacity-50 shadow-sm"
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage(prevPage => prevPage - 1)}
          >
            <MdArrowBack /> Previous
          </button>

          <p className="text-gray-300 font-bold">Page {currentPage} </p>

          <button
            className="flex items-center py-2 px-4 bg-gray-600 gap-2 disabled:opacity-50 shadow-sm"
            disabled={isLoading || currentPage === 10}
            onMouseEnter={handleMouseEnterNextPage}
            onClick={() => setCurrentPage(prevPage => prevPage + 1)}
          >
            Next <MdArrowForward />
          </button>
        </div>
      )}

      {isFetching && !isLoading && (
        <p className="text-lg text-gray-400 mt-2">Updating...</p>
      )}
    </>
  )
}

export default Home
