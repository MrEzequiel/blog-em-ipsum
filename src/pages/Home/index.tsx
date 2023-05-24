import { FC, useState } from "react";
import { MdArrowBack, MdArrowForward, MdLink } from "react-icons/md";
import { Link } from "react-router-dom";

import IBlog from "../../interfaces/IBlog";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_POSTS = gql`
  query AllPosts($data: AllPostsInput!) {
    allPosts(data: $data) {
      body
      id
      title
    }
  }
`;

const Home: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    loading: isLoading,
    error,
    client,
  } = useQuery<{ allPosts: IBlog[] }>(GET_ALL_POSTS, {
    variables: {
      data: {
        _limit: 10,
        _page: currentPage,
      },
    },
  });
  const blogList = data?.allPosts;
  const isError = !!error;

  const handleMouseEnterNextPage = () => {
    if (currentPage === 10) return;
    client.query({
      query: GET_ALL_POSTS,
      variables: {
        data: {
          _limit: 10,
          _page: currentPage + 1,
        },
      },
    });
  };

  return (
    <>
      <h1 className="font-mono text-5xl italic font-bold text-gray-100 mb-4">
        Blogs
      </h1>

      {isLoading && <p className="text-lg text-gray-400">Loading...</p>}

      {isError && (
        <p className="text-lg">
          Error fetching blog list:{" "}
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
    </>
  );
};

export default Home;
