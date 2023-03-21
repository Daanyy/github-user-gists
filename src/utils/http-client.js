import axios from 'axios'

export class HttpClient {
  constructor() {
    this._axiosInstance = axios.create()
    this._axiosInstance.interceptors.request.use(this._handleRequest)
    this._axiosInstance.interceptors.response.use(this._handleResponse)
  }

  request(url, data) {
    return this._axiosInstance.request({
      baseURL: API_URL,
      url: url.url,
      method: url.method,
      data: data,
      headers: url.headers,
      params: url.params,
      responseType: url.responseType,
    })
  }

  _handleRequest(requestConfig) {
    if (requestConfig && requestConfig.headers) {
        requestConfig.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
    }

    return requestConfig
  }

  _handleResponse(axiosResponse) {
    return axiosResponse
  }
}

export const httpClient = new HttpClient()