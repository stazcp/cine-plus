// curl --request GET \
//   --url 'https://api.themoviedb.org/3/movie/76341' \
//   --header 'Authorization: Bearer <<access_token>>' \
//   --header 'Content-Type: application/json;charset=utf-8'

// let session_id;
// const access_token =
//   'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDQ2ZDQ0ZjdmOGYyMTcwNDMwNTA0ODQ4MGQyZjEyOCIsInN1YiI6IjVlZjIzYmZlOWE4YThhMDAzNWI0MTcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4_xLuZujLXBRRSRjCrOy2kso4DvOLuRJGDPFQGjx3ao';
// const cors_url = 'https://cors-anywhere.herokuapp.com/';
export const api_key = '6d46d44f7f8f21704305048480d2f128';
const base_url = 'https://api.themoviedb.org/3/';

export const getConfig = async () => {
  let url = `${base_url}configuration?api_key=${api_key}`;
  const data = await fetch(url);
  return data.json();
}

export const get = async (type,category) => {
  let url = `${base_url}${type}/${category}?api_key=${api_key}`;
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



