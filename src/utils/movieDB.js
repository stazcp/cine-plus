// curl --request GET \
//   --url 'https://api.themoviedb.org/3/movie/76341' \
//   --header 'Authorization: Bearer <<access_token>>' \
//   --header 'Content-Type: application/json;charset=utf-8'
import {api_key} from '../keys.json';

const base_url = 'https://api.themoviedb.org/3/';

export const getConfig = async () => {
  let url = `${base_url}configuration?api_key=${api_key}`;
  const data = await fetch(url);
  return data.json();
}

// send in object for more options
export const get = async (type,category,extra) => {
  let url = extra
    ? `${base_url}${type}/${category}/${extra}?api_key=${api_key}`
    : `${base_url}${type}/${category}?api_key=${api_key}`;
  return await fetch(url).then(response => response.json() )
  .then(jsonResponse =>{
    if(jsonResponse){
      return jsonResponse.results.map( movie => {
        return movie
      })
    }
  })
  .catch(err => console.log(err))
};



