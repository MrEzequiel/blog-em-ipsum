import api from '../service/api'

const getBlogList = async (page: number) => {
  const response = await api.get('/posts', {
    params: {
      _limit: 10,
      _page: page
    }
  })

  return response.data
}

export default getBlogList
