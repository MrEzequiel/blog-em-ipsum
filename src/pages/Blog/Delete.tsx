import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const DELETE_BLOG = gql`
  mutation Mutation($id: Float!) {
    deletePost(id: $id)
  }
`;

const Delete = ({ id }: { id: number }) => {
  const navigate = useNavigate();
  const [deleteBlog, { loading }] = useMutation(DELETE_BLOG);

  const handleDelete = async () => {
    await deleteBlog({
      variables: {
        id,
      },
    });
    navigate("/");
  };

  return (
    <button
      className="px-2 py-1 bg-gray-900 text-gray-400 disabled:opacity-50"
      disabled={loading}
      onClick={handleDelete}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default Delete;
