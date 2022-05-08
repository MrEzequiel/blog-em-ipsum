import api from '../service/api'

const getBlogList = async () => {
  const response = await api.get('/posts', {
    params: {
      _limit: 10,
      _page: 0
    }
  })

  return response.data
}

export default getBlogList
