// @flow
// improvements:
// 1. use token
// 2. optimize

let api_key: string = 'no key'

if (process.env.node_env === 'production') {
  let keys = process.env
  //$FlowFixMe
  api_key = keys.api_key
} else {
  let keys = require('../keys.json')
  api_key = keys.api_key
}

const base_url = 'https://api.themoviedb.org/3/'

export const getConfig = async (): Promise<{
  change_keys: any,
  images: any,
} | void> => {
  try {
    let url = `${base_url}configuration?api_key=${api_key}`
    const data = await fetch(url)
    let result = await data.json()
    return result
  } catch (error) {
    console.log(error)
  }
}

// potentially receives object, phase B
export const get = async (type: string, category: string, extra: string): Promise<any> => {
  try {
    let url = extra
      ? `${base_url}${type}/${category}/${extra}?api_key=${api_key}`
      : `${base_url}${type}/${category}?api_key=${api_key}`

    let response = await fetch(url)
    let result = await response.json()
    if (result.results) {
      return result.results
    } else if (result.cast) {
      return result.cast
    } else {
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

// http://api.themoviedb.org/3/movie/157336?api_key=###&append_to_response=videos
// ^^ to get video info and trailer with one fetch.
// https://api.themoviedb.org/3/movie/694919/videos?api_key=###&language=en-US
// just trailer

export const getTrailer = async (id: string): Promise<any> => {
  try {
    if (id) {
      let url = `${base_url}movie/${id}?api_key=${api_key}&append_to_response=videos`
      let response = await fetch(url)
      let data = await response.json()
      console.log(data)
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

// how to get trailers:
// https://www.themoviedb.org/talk/5451ec02c3a3680245005e3c
