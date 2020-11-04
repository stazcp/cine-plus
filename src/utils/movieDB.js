// @flow
// improvements:
// 1. use token
// 2. optimize

let api_key: string = 'no key'

//app determines if its running locally or on Versel app, since keys will be in different locations
if (process.env.node_env === 'production') {
  let keys = process.env
  //$FlowFixMe
  api_key = keys.api_key
} else {
  let keys = require('../keys.json')
  api_key = keys.api_key
}

const base_url = 'https://api.themoviedb.org/3/'

//used to get the basePosterUrl and more
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

// used for fetching movies, tvShows, and people
export const get = async (type: string, conf: string, extra: ?string): Promise<any> => {
  try {
    let url = extra
        ? `${base_url}${type}/${conf}/${extra}?api_key=${api_key}`
        : `${base_url}${type}/${conf}?api_key=${api_key}`,
      response = await fetch(url),
      result = await response.json()
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
      let url = `${base_url}movie/${id}?api_key=${api_key}&append_to_response=videos`,
        response = await fetch(url),
        data = await response.json()
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

// how to get trailers:
// https://www.themoviedb.org/talk/5451ec02c3a3680245005e3c
