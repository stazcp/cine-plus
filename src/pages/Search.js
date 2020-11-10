import React, { useEffect, useState, useContext } from 'react'
import { MovieContext } from '../components/MovieContext'
import { useParams } from 'react-router-dom'
import { get, getConfig } from '../utils/movieDB'
import DisplayCard from '../components/DisplayCard'
import { useStylesSm } from '../styles/CardStyles'
import { smCardStyles } from '../styles/RatingBarStyles'
import { Typography, Box, Container, Grid } from '@material-ui/core'
import { useStyles } from '../components/ColumnHeader'

const styles = {
  scroller: {
    overflowX: 'scroll',
  },
}

export default function Search() {
  const classes = useStyles()
  const { query } = useParams()
  const [movies, setMovies] = useState([])
  const [shows, setShows] = useState([])
  const [people, setPeople] = useState([])
  const [other, setOther] = useState([])
  const { basePosterUrl, setBasePosterUrl } = useContext(MovieContext)
  const posterSize = 'w300'

  useEffect(() => {
    getPosterUrl()
    fetchSearch()
  }, [])

  const getPosterUrl = () => {
    if (!basePosterUrl) {
      getConfig().then((data) => {
        if (data?.images) {
          setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
        }
      })
    }
  }

  const fetchSearch = () => {
    get(query).then((result) => {
      result.map((ele) => {
        if (ele?.media_type) {
          switch (ele.media_type) {
            case 'movie':
              setMovies((prev) => [...prev, ele])
              break
            case 'tv':
              setShows((prev) => [...prev, ele])
              break
            case 'person':
              setPeople((prev) => [...prev, ele])
              break
            default:
              setOther((prev) => [...prev, ele])
          }
        } else {
          setOther((prev) => [...prev, ele])
        }
      })
    })
  }

  //datum is singular for data
  const renderResults = (data, title) => {
    if (!data.length) {
      return null
    }

    return (
      <Box>
        <Typography className={classes.column_header}>{title}</Typography>
        <Box display="flex" style={styles.scroller}>
          {data.map((datum) => {
            let {
              id,
              original_title,
              name,
              release_date,
              first_air_date,
              poster_path,
              profile_path,
              media_type,
              original_name,
              vote_average,
            } = datum

            let route = media_type === 'person' ? `/person/${id}` : `/display/${media_type}/${id}`
            return (
              <DisplayCard
                key={id}
                to={route}
                useStyles={useStylesSm}
                ratingStyle={smCardStyles}
                title={original_title || name || original_name}
                date={release_date || first_air_date}
                poster={`${basePosterUrl}${posterSize}${poster_path || profile_path}`}
                element={datum}
                type={media_type}
                rating={vote_average}
              />
            )
          })}
        </Box>
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      {renderResults(movies, 'Movies')}
      {renderResults(shows, 'Tv Shows')}
      {renderResults(people, 'People')}
      {renderResults(other, 'More..')}
    </Container>
  )
}
