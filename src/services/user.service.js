import { httpClient } from '@/utils/http-client'

export class UserService {
  async getUserDetails(username) {
    const result = await httpClient.request({
      url: `/users/${username}`,
      method: 'get',
    })

    return result
  }

  async getUserGists(username) {
    const result = await httpClient.request({
      url: `/users/${username}/gists`,
      method: 'get',
    })

    return result
  }

  async getUserForks(gistId) {
    const result = await httpClient.request({
      url: `/gists/${gistId}/forks`,
      method: 'get',
    })

    return result
  }

  async getPageContent(baseURL) {
    const result = await httpClient.request({
      baseURL,
      method: 'get',
    })

    return result
  }
}

export const userService = new UserService()