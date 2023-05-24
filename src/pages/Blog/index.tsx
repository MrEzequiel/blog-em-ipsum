import { FC } from "react";
import { MdArrowBack } from "react-icons/md";

import { useNavigate, useParams } from "react-router-dom";

import { BlogWithComments } from "../../interfaces/IBlog";
import { gql, useQuery } from "@apollo/client";
import Delete from "./Delete";
import Edit from "./Edit";

export const GET_BLOG = gql`
  query PostById($id: Float!) {
    postById(id: $id) {
      id
      title
      body
      comments {
        id
        name
        body
        email
      }
    }
  }
`;

const Blog: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = parseInt(params.id ?? "");

  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ postById: BlogWithComments }>(GET_BLOG, {
    variables: {
      id,
    },
  });
  const blog = data?.postById;
  const isError = !!error;

  return (
    <>
      {isLoading && <p className="text-lg text-gray-400">Loading...</p>}

      {isError && <p className="text-lg text-red-300">Error fetching blog</p>}

      {!isLoading && !!blog && (
        <div className="pb-10 mb-10 border-b border-gray-900">
          <div
            className="flex items-center cursor-pointer gap-2 mb-2 w-fit hover:brightness-150"
            onClick={() => {
              navigate("/");
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
            <Delete id={id} />
            <Edit id={id} />
          </div>

          <p className="text-lg text-gray-300 ">{blog.body}</p>
        </div>
      )}

      {isLoading && (
        <p className="text-lg text-gray-400 mt-2">Loading comments...</p>
      )}

      {!!blog?.comments && (
        <div className="pb-5">
          <span className="uppercase text-gray-600 italic tracking-wider">
            Comments
          </span>

          <ul className="flex flex-col gap-8 mt-4">
            {blog.comments.map(comment => (
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
  );
};

export default Blog;
