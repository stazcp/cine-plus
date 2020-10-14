// @flow
import React, { useState, useEffect } from "react"
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  Grid,
  Box,
  Typography,
} from "@material-ui/core"
import { useParams, useLocation } from "react-router-dom"
import { useStylesDisplay } from "../styles/CardStyles"
import Image from "../img/deadpool.jpg"
import { get, getConfig } from "../utils/movieDB"
import DisplayCard from "../components/DisplayCard"
import { useStylesSm } from "../styles/CardStyles"

const styles = {
  box: {
    paddingTop: 40,
    backgroundImage: `url(${Image})`,
    color: "white",
    width: "100%",
  },
  headerSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    paddingLeft: 80,
    paddingRight: 40,
  },
  h1: {
    fontSize: 35.2,
    fontWeight: 700,
  },
  cardColor: {
    backgroundColor: "#032541",
  },
  topBar: {
    height: 46,
  },
  bot: {
    height: 200,
  },
  h2: {
    fontSize: 20.8,
    fontWeight: 600,
  },
}

export default function Display(): React$Element<React$FragmentType> {
  const [poster, setPoster] = useState("https://source.unsplash.com/random")
  const [cast, setCast] = useState()
  let { type, id } = useParams()
  let movie = JSON.parse(window.localStorage.getItem(id))
  const classes = useStylesDisplay()
  const location = useLocation()
  let basePosterUrl
  let posterSize = "w342"
  let profileSize = "original"
  let date = movie.release_date || movie.first_air_date
  let title = movie.original_title || movie.name || movie.title

  useEffect(() => {
    getPosterUrl()
    getCast()
  }, [])

  const getPosterUrl = () => {
    let posterUrl = window.localStorage.getItem("poster_url")
    if (posterUrl) {
      basePosterUrl = JSON.parse(posterUrl)
    } else {
      getConfig().then((data) => {
        if (data) {
          basePosterUrl = data.images.secure_base_url || data.images.base_url
        }
      })
    }
    setPoster(`${basePosterUrl}${posterSize}${movie.poster_path}`)
  }

  const getCast = () => {
    get(type, id, "credits").then((data) => {
      setCast(data)
    })
  }

  // note to create a Person page
  const renderCast = () => {
    if (cast) {
      return cast.map((actor) => {
        console.log(actor)
        let { character, name, profile_path, id } = actor
        let route = `/person/${id}`
        return (
          <DisplayCard
            key={id}
            to={route}
            useStyles={useStylesSm}
            title={name}
            date={character}
            poster={`${basePosterUrl}${profileSize}${profile_path}`}
            movie={actor}
          />
        )
      })
    }
    return <h5>Cast Loading...</h5>
  }

  return (
    <>
      <Box style={styles.topBar}></Box>
      <Box style={styles.box}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Card className={classes.root} style={styles.cardColor}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={poster}
                  title={title}
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  X
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={9} style={styles.headerSection}>
            <Typography component="h1" variant="h4" style={styles.h1}>
              {title}
              {` `}({date.slice(0, 4)})
            </Typography>
            <Typography>{date} •</Typography>
            <br />
            <Typography component="h2" variant="h5" style={styles.h2}>
              Overview
            </Typography>
            <br />
            <Typography> {movie.overview} </Typography>
            <br />
            <Box display="flex">{/* render directors */}</Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={styles.bot} flexDirection="row" display="flex">
        {renderCast()}
      </Box>
    </>
  )
}
