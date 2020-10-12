// improvements:
// 1. potentially want to use token as well?
// 2. optimize

import {api_key} from '../keys.json';

const base_url = 'https://api.themoviedb.org/3/';

export const getConfig = async () => {
  try {
    let url = `${base_url}configuration?api_key=${api_key}`;
    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.log(error);
  }
}

// send in object for more options, in that case I would have to include a / for each option
export const get = async (type,category,extra) => {
  try{
    let url = extra
      ? `${base_url}${type}/${category}/${extra}?api_key=${api_key}`
      : `${base_url}${type}/${category}?api_key=${api_key}`;

    let response = await fetch(url)
    let result = await response.json()
    if(result.results){
      return result.results
    } else if(result.cast){
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
// https://api.themoviedb.org/3/movie/694919/videos?api_key=6d46d44f7f8f21704305048480d2f128&language=en-US
// just trailer

export const getTrailer = async (id) => {
  try {
    if (id) {
      let url = `${base_url}movie/${id}?api_key=${api_key}&append_to_response=videos`;
      let response = await fetch(url);
      let data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

// how to get trailers:
// https://www.themoviedb.org/talk/5451ec02c3a3680245005e3c



