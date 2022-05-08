import api from '../service/api'

const getBlogComments = async (idBlog: string) => {
  const response = await api.get(`/posts/${idBlog}/comments`)
  return response.data
}

export default getBlogComments
