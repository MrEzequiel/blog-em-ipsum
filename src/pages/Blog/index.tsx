import { FC } from 'react'
import { MdArrowBack } from 'react-icons/md'

import { useMutation, useQueries, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import deleteBlog from '../../functions/deleteBlog'
import getBlog from '../../functions/getBlog'
import getBlogComments from '../../functions/getBlogComments'
import patchBlog from '../../functions/patchBlog'

import IBlog from '../../interfaces/IBlog'
import IBlogComments from '../../interfaces/IBlogComments'

const Blog: FC = () => {
  const queryClient = useQueryClient()

  const params = useParams()
  const navigate = useNavigate()
  const id = params.id as string

  const [
    { data: blog, isLoading, isError },
    { data: comments, isLoading: isLoadingComments, isError: isErrorComments }
  ] = useQueries([
    {
      queryKey: ['blog', id],
      queryFn: () => getBlog(id) as Promise<IBlog>,
      staleTime: 1000 * 60 * 2 // 2 minutes
    },
    {
      queryKey: ['comments', id],
      queryFn: () => getBlogComments(id) as Promise<IBlogComments[]>
    }
  ])

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation(
    deleteBlog,
    {
      onSuccess: () => {
        queryClient.removeQueries('blog-list')
        navigate('/')
      }
    }
  )
  const { mutate: mutateEdit, isLoading: isLoadingEdit } = useMutation(
    patchBlog,
    {
      onSuccess: (data: IBlog) => {
        queryClient.setQueriesData(['blog', id], data)
      }
    }
  )

  const handleDelete = () => {
    mutateDelete(id)
  }

  const handleEdit = () => {
    mutateEdit(id)
  }

  return (
    <>
      {isLoading && <p className="text-lg text-gray-400">Loading...</p>}

      {isError && <p className="text-lg text-red-300">Error fetching blog</p>}

      {!isLoading && !!blog && (
        <div className="pb-10 mb-10 border-b border-gray-900">
          <div
            className="flex items-center cursor-pointer gap-2 mb-2 w-fit hover:brightness-150"
            onClick={() => {
              navigate('/')
            }}
          >
            <button className="flex items-center justify-center bg-gray-600 text-gray-800 rounded-full w-5 h-5">
              <MdArrowBack />
            </button>

            <span className="uppercase text-gray-600 italic tracking-wider">
              Blogs
            </span>
          </div>

          <h1 className="font-mono text-5xl italic font-bold text-gray-100 first-letter:uppercase">
            {blog.title}
          </h1>
          <div className="mb-6 mt-2 flex gap-1">
            <button
              className="px-2 py-1 bg-gray-900 text-gray-400 disabled:opacity-50"
              disabled={isLoadingDelete}
              onClick={handleDelete}
            >
              {isLoadingDelete ? 'Deleting...' : 'Delete'}
            </button>

            <button
              className="px-2 py-1 bg-gray-900 text-gray-400 disabled:opacity-50"
              disabled={isLoadingEdit}
              onClick={handleEdit}
            >
              {isLoadingEdit ? 'Editing...' : 'Edit'}
            </button>
          </div>

          <p className="text-lg text-gray-300 ">{blog.body}</p>
        </div>
      )}

      {isLoadingComments && !isLoading && (
        <p className="text-lg text-gray-400 mt-2">Loading comments...</p>
      )}

      {!isLoadingComments &&
        !isError &&
        !isLoading &&
        !!comments &&
        !isErrorComments && (
          <div className="pb-5">
            <span className="uppercase text-gray-600 italic tracking-wider">
              Comments
            </span>

            <ul className="flex flex-col gap-8 mt-4">
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="flex flex-col border-b border-gray-900 pb-8 last:border-b-0"
                >
                  <div className="mb-2">
                    <h2 className="font-bold text-lg first-letter:uppercase">
                      {comment.name}
                    </h2>
                    <span className="text-gray-400">{comment.email}</span>
                  </div>

                  <p className="text-gray-300">{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  )
}

export default Blog
