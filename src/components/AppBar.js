// improvements needed:
// 1. Menu's open on hover
// 2. Menu's close on mouseOut
// 3. Menu's close when reaching destination
// 4. Menu's are on top of mobile menu and not under
// 5. Build pop-over's for + and Lang

import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Menu, MenuItem, Badge, IconButton } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/Add'
import LanguageIcon from '@material-ui/icons/Language'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/FirebaseContext'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 3,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  AppBar: {
    backgroundColor: '#032541',
    boxShadow: '0 0 0 0',
  },
  h2Link: {
    fontWeight: '700',
    fontSize: '2em',
  },
  h5Link: {
    fontWeight: '600',
    fontSize: '1em',
  },
  mainMenu: {
    display: 'none',
    flex: 2,
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  rightMenu: {
    display: 'none',
    flex: 1,
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}))

const styles = {
  routingLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const MENU_ANCHORS = {
    movies: null,
    people: null,
    tvShows: null,
    more: null,
    profile: null,
  }
  const [anchorEl, setAnchorEl] = React.useState(MENU_ANCHORS)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  // returns user or false -> user.displayName = name
  const { user } = useContext(FirebaseContext)

  // if (user) {
  //   console.log(user.displayName)
  // } else {
  //   console.log('no user')
  // }

  const handleOpenMenu = (e, anchor) => {
    setAnchorEl({ ...MENU_ANCHORS, [anchor]: e.currentTarget })
    e.preventDefault()
  }

  const handleMenuClose = () => {
    setAnchorEl(MENU_ANCHORS)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const moviesMenuId = 'movies-menu'
  const renderMoviesMenu = () => {
    const items = [
      { title: 'Popular', to: '/popular-movies' },
      { title: 'Now Playing', to: '/now-playing-movies' },
      { title: 'Upcoming', to: '/upcoming-movies' },
      { title: 'Top Rated', to: '/top-rated-movies' },
    ]
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.movies}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={moviesMenuId}
        keepMounted
        open={Boolean(anchorEl.movies)}
        onClose={handleMenuClose}
      >
        {items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.routingLink}>
                {' '}
                {item.title}{' '}
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  const tvShowsMenuId = 'tv-shows-menu'
  const renderTVShowsMenu = () => {
    const items = [
      { title: 'Popular', to: '/popular-shows' },
      { title: 'Airing Today', to: '/airing-today-shows' },
      { title: 'On TV', to: '/tv-shows' },
      { title: 'Top Rated', to: '/top-rated-shows' },
    ]
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.tvShows}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={tvShowsMenuId}
        keepMounted
        open={Boolean(anchorEl.tvShows)}
        onClose={handleMenuClose}
      >
        {items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.routingLink}>
                {' '}
                {item.title}{' '}
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  const peopleMenuId = 'people-menu'
  const renderPeopleMenu = () => {
    const items = [{ title: 'Popular People', to: '/people' }]
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.people}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={peopleMenuId}
        keepMounted
        open={Boolean(anchorEl.people)}
        onClose={handleMenuClose}
      >
        {items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.routingLink}>
                {' '}
                {item.title}{' '}
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  const moreMenuId = 'more-menu'
  const renderMoreMenu = () => {
    const items = [
      { title: 'Discussions', to: '/discussions' },
      { title: 'Leaderboard', to: '/leaderboard' },
      { title: 'Support', to: '/support' },
      { title: 'API', to: '/api' },
    ]
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.more}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={moreMenuId}
        keepMounted
        open={Boolean(anchorEl.more)}
        onClose={handleMenuClose}
      >
        {items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.routingLink}>
                {' '}
                {item.title}{' '}
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  const accountMenuId = 'account-menu'
  const renderMenu = () => {
    const items = [
      { title: 'Login', to: '/login' },
      { title: 'Join Cine+', to: '/join' },
    ]
    return (
      <Menu
        anchorEl={anchorEl.account}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={accountMenuId}
        keepMounted
        open={Boolean(anchorEl.account)}
        onClose={handleMenuClose}
      >
        {items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.routingLink}>
                {' '}
                {item.title}{' '}
              </Link>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }

  const renderMovies = (
    <Typography
      edge="end"
      aria-label="movies menu"
      aria-controls={moviesMenuId}
      aria-haspopup="true"
      onClick={(e) => handleOpenMenu(e, 'movies')}
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="" style={styles.link}>
        Movies
      </Link>
    </Typography>
  )

  const renderTvShows = (
    <Typography
      edge="end"
      aria-label="tv shows menu"
      aria-controls={tvShowsMenuId}
      aria-haspopup="true"
      onClick={(e) => handleOpenMenu(e, 'tvShows')}
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="" style={styles.link}>
        TV Shows
      </Link>
    </Typography>
  )

  const renderPeople = (
    <Typography
      edge="end"
      aria-label="people menu"
      aria-controls={peopleMenuId}
      aria-haspopup="true"
      onClick={(e) => handleOpenMenu(e, 'people')}
      // onMouseOver={handlePeopleMenuOpen}
      // onMouseLeave={handleMenuClose} crashes
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="" style={styles.link}>
        People
      </Link>
    </Typography>
  )

  const renderMore = (
    <Typography
      edge="end"
      aria-label="more menu"
      aria-controls={moreMenuId}
      aria-haspopup="true"
      onClick={(e) => handleOpenMenu(e, 'more')}
      // onMouseOver={handleMoreMenuOpen}
      // onMouseLeave={handleMenuClose} crashes
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="" style={styles.link}>
        More
      </Link>
    </Typography>
  )

  const renderLogin = (
    <Typography
      edge="end"
      aria-label="people menu"
      aria-controls={peopleMenuId}
      aria-haspopup="true"
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="/login" style={styles.link}>
        Login
      </Link>
    </Typography>
  )

  const renderJoin = (
    <Typography
      edge="end"
      aria-label="people menu"
      aria-controls={peopleMenuId}
      aria-haspopup="true"
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="/join" style={styles.link}>
        Join Cine+
      </Link>
    </Typography>
  )

  const renderLanguages = (
    <IconButton aria-label="show" color="inherit">
      <Badge color="secondary">
        {/* languages? */}
        <LanguageIcon />
      </Badge>
    </IconButton>
  )

  const renderAdd = (
    <IconButton aria-label="show" color="inherit">
      <Badge color="secondary">
        {/* popup goes here */}
        <AddIcon />
      </Badge>
    </IconButton>
  )

  // menus show under mobile menu?
  const mobileMenuId = 'mobile-menu'
  const renderMobileMenu = () => {
    const items = [renderMovies, renderTvShows, renderPeople, renderMore]
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {items.map((item, i) => (
          <MenuItem key={i}>{item}</MenuItem>
        ))}
      </Menu>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography className={classes.h2Link} variant="h2" noWrap>
            <Link to="/" style={styles.link}>
              Cine+
            </Link>
          </Typography>
          <div className={classes.mainMenu}>
            {renderMovies}
            {renderTvShows}
            {renderPeople}
            {renderMore}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {renderAdd}
            {renderLanguages}
          </div>
          <div className={classes.rightMenu}>
            {renderLogin}
            {renderJoin}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderPeopleMenu()}
      {renderMoreMenu()}
      {renderMoviesMenu()}
      {renderTVShowsMenu()}
      {renderMobileMenu()}
      {renderMenu()}
    </div>
  )
}
