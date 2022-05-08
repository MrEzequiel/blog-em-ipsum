import api from '../service/api'

const patchBlog = async (idBlog: string) => {
  const response = await api.patch(`/posts/${idBlog}`, {
    title: 'React Query is awesome!'
  })
  return response.data
}

export default patchBlog
