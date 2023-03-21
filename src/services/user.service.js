import { httpClient } from '@/utils/http-client'

export class UserService {
  async getUserDetails(username) {
    const result = await httpClient.request({
      url: `/users/${username}`,
      method: 'get',
    })

    return result
  }
}

export const userService = new UserService()