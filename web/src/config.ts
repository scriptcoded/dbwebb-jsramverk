interface Config {
  apiURL: string
}

export let config: Config

export const loadConfig = () => {
  if (window.location.hostname === 'localhost') {
    config = {
      apiURL: 'http://localhost:4000'
    }
  } else {
    config = {
      apiURL: 'https://jsramverk-api-manh20.azurewebsites.net'
    }
  }
}
