import { gql, useMutation } from "@apollo/client";
import { FC } from "react";
import { BlogWithComments } from "../../interfaces/IBlog";
import { GET_BLOG } from ".";

const EDIT_BLOG = gql`
  mutation Mutation($data: UpdatePost!, $updatePostId: Float!) {
    updatePost(data: $data, id: $updatePostId) {
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

const Edit: FC<{ id: number }> = ({ id }) => {
  const [editBlog, { loading }] = useMutation<{
    updatePost: BlogWithComments;
  }>(EDIT_BLOG);

  const handleEdit = async () => {
    await editBlog({
      variables: {
        data: {
          body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur mollitia a placeat? Autem, maxime voluptates! Autem ex, eveniet quae consequatur enim numquam laudantium amet velit magnam soluta excepturi earum ducimus!",
          title: "Graphql is awesome!",
        },
        updatePostId: id,
      },
      // refetchQueries: [GET_BLOG],
      update: (cache, { data }) => {
        if (!data?.updatePost) return;

        cache.writeQuery<{ postById: BlogWithComments }>({
          query: GET_BLOG,
          data: {
            postById: data?.updatePost,
          },
        });
      },
    });
  };

  return (
    <button
      className="px-2 py-1 bg-gray-900 text-gray-400 disabled:opacity-50"
      disabled={loading}
      onClick={handleEdit}
    >
      {loading ? "Editing..." : "Edit"}
    </button>
  );
};

export default Edit;
