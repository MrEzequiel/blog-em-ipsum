import api from '../service/api'

const getBlog = async (idBlog: string) => {
  const response = await api.get(`/posts/${idBlog}`)
  return response.data
}

export default getBlog
