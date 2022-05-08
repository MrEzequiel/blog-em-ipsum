import api from '../service/api'

const deleteBlog = async (idBlog: string) => {
  const response = await api.delete(`/posts/${idBlog}`)
  return response.data
}

export default deleteBlog
