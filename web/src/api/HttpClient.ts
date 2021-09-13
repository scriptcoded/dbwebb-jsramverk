export interface HttpClientConfig {
  baseURL?: string;
  headers: { [key: string]: string };
}

type NonNullable<T> = Exclude<T, null | undefined>
export type FetchOptions = NonNullable<Parameters<typeof fetch>[1]>
export interface ReqOptions extends FetchOptions {
  params?: { [key: string]: string }
}

export class HttpError extends Error {
  constructor (public status: number, public message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = new.target.name
  }
}

export class HttpClient {
  config: HttpClientConfig = {
    headers: {}
  }

  defaultOptions: FetchOptions = {
    credentials: 'include'
  }

  private static instance: HttpClient;

  // eslint-disable-next-line no-useless-constructor
  private constructor () { }

  public static getInstance (): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
    }

    return HttpClient.instance
  }

  public setHeader (name: string, value: string) {
    this.config.headers[name] = value
  }

  private getURL (url: string, queryParams?: { [key: string]: string }) {
    if (queryParams) {
      const urlObj = new URL(url, this.config.baseURL)

      if (queryParams) {
        for (const param in queryParams) {
          urlObj.searchParams.set(param, queryParams[param])
        }
      }

      return urlObj.href
    } else {
      return new URL(url, this.config.baseURL).href
    }
  }

  /**
   * Retrieves the JSON data from the request and throws if an error was sent.
   */
  private async getResponseJSON (response: Response) {
    const responseBody = await response.json()

    if (responseBody.error) {
      throw new HttpError(response.status, responseBody.error.message)
    }

    if (response.status >= 400) {
      throw new HttpError(response.status, `HTTP request failed: ${response.statusText}`)
    }

    return responseBody
  }

  public async get (url: string, options: ReqOptions = {}) {
    const {
      params,
      ...fetchOptions
    } = options

    const response = await fetch(this.getURL(url, params), {
      method: 'GET',
      headers: {
        ...this.config.headers
      },
      ...this.defaultOptions,
      ...fetchOptions
    })

    const responseBody = await this.getResponseJSON(response)

    return responseBody
  }

  public async post (url: string, body?: any, options: ReqOptions = {}) {
    const {
      params,
      ...fetchOptions
    } = options

    const response = await fetch(this.getURL(url, params), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers
      },
      ...this.defaultOptions,
      body: JSON.stringify(body),
      ...fetchOptions
    })

    const responseBody = await this.getResponseJSON(response)

    return responseBody
  }

  public async patch (url: string, body: any, options: ReqOptions = {}) {
    const {
      params,
      ...fetchOptions
    } = options

    const response = await fetch(this.getURL(url, params), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers
      },
      ...this.defaultOptions,
      body: JSON.stringify(body),
      ...fetchOptions
    })

    const responseBody = await this.getResponseJSON(response)

    return responseBody
  }

  public async delete (url: string, options: ReqOptions = {}) {
    const {
      params,
      ...fetchOptions
    } = options

    const response = await fetch(this.getURL(url, params), {
      method: 'DELETE',
      headers: {
        ...this.config.headers
      },
      ...this.defaultOptions,
      ...fetchOptions
    })

    const responseBody = await this.getResponseJSON(response)

    return responseBody
  }
}

const httpClient = HttpClient.getInstance()
export { httpClient }
