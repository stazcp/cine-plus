// @flow
import React, { useContext, useEffect, useState } from 'react'
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Badge,
  IconButton,
  Paper,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import LanguageIcon from '@material-ui/icons/Language'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/FirebaseContext'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import Drawer from './Drawer'
import { routingData } from '../routing/routes'
import Tooltip from '@material-ui/core/Tooltip'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

const drawerWidth = 240

const defaultTheme = createMuiTheme()
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: '1em',
        fontWeight: '400',
      },
    },
  },
})

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 2,
    display: 'flex',
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
    alignItems: 'flex-start',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    paddingRight: 16,
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
  //Drawer
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  tooltip: {
    backgroundColor: 'white',
    color: 'black',
  },
}))

const styles = {
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}

export default function PrimarySearchAppBar(): React$Element<'div'> {
  const classes = useStyles()
  const MENU_ANCHORS = {
    movies: null,
    people: null,
    tvShows: null,
    more: null,
  }
  const [anchorEl, setAnchorEl] = React.useState(MENU_ANCHORS)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user } = useContext(FirebaseContext)

  const handleOpenMenu = (e, anchor: string) => {
    setAnchorEl({ ...MENU_ANCHORS, [anchor]: e.currentTarget })
    e.preventDefault()
  }

  const handleMenuClose = () => {
    setAnchorEl(MENU_ANCHORS)
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  /*
  improvement:
  <MenuCreator>
{routingData.people.items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.link}>
                {' '}
                {item.title}{' '}
              </Link>
            </MenuItem>
          )
        })}
  </MenuCreator>

  Or send in different arrays to the same component
  */

  const moviesMenuId = 'movies-menu'
  const renderMoviesMenu = () => {
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
        {routingData.movies.items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.link}>
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
        {routingData.tvShows.items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.link}>
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
        {routingData.people.items.map((item, i) => {
          return (
            <MenuItem key={i}>
              <Link to={item.to} style={styles.link}>
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
      <Link to="#" style={styles.link}>
        {routingData.movies.title}
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
      <Link to="#" style={styles.link}>
        {routingData.tvShows.title}
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
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link to="#" style={styles.link}>
        {routingData.people.title}
      </Link>
    </Typography>
  )

  const renderAccountActions = () => {
    if (user) {
      return (
        <Tooltip title="Account">
          <IconButton aria-label="show" color="inherit">
            <Link to="/account" style={styles.link}>
              {user && `${user.displayName}`.substring(0, 18)}
            </Link>
          </IconButton>
        </Tooltip>
      )
    }
    return routingData.account.items.map((ele, i) => {
      const { title, to } = ele
      return (
        <Typography edge="end" color="inherit" className={classes.h5Link} variant="h5" key={i}>
          <Link to={to} style={styles.link} key={i}>
            {title}
          </Link>
        </Typography>
      )
    })
  }

  const renderLanguages = (
    <Tooltip title="Language: EN">
      <IconButton aria-label="language is english" color="inherit">
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  )

  const renderAdd = (
    <Tooltip
      title={
        user
          ? 'You can now Like Movies, Shows and People!'
          : 'Login or Join to Like your Favorite Films'
      }
    >
      <IconButton aria-label="message" color="inherit">
        <AddIcon />
      </IconButton>
    </Tooltip>
  )

  return (
    <div className={classes.grow}>
      <MuiThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          className={clsx(classes.AppBar, { [classes.appBarShift]: openDrawer })}
        >
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
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {renderAdd}
              {renderLanguages}
            </div>
            <div className={classes.rightMenu}>{renderAccountActions()}</div>
            <div className={classes.sectionMobile}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(openDrawer && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderPeopleMenu()}
        {renderMoviesMenu()}
        {renderTVShowsMenu()}
        <Drawer open={openDrawer} handleDrawerClose={handleDrawerClose} data={routingData} />
        <Paper>
          <div className={classes.toolbar}></div>
        </Paper>
        {/* //makes sure content is not hidden under AppBar */}
      </MuiThemeProvider>
    </div>
  )
}
