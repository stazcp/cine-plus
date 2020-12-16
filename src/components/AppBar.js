// @flow
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Badge,
  IconButton,
  Paper,
  Box,
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
import MenuCreator from './MenuCreator'
import { shadows } from '@material-ui/system'
const drawerWidth = 240

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
  logo: {
    fontWeight: '700',
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

const MENU_ANCHORS = {
  movies: null,
  people: null,
  tvShows: null,
  more: null,
}

export default function PrimarySearchAppBar(): React$Element<'div'> {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(MENU_ANCHORS)
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user } = useContext(FirebaseContext)
  const moviesMenuId = 'movies-menu',
    tvShowsMenuId = 'tv-shows-menu',
    peopleMenuId = 'people-menu'

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

  const renderAccountActions = user ? (
    <Tooltip title="Account">
      <IconButton aria-label="show" color="inherit">
        <Link to="/account" style={styles.link}>
          {user && `${user.displayName}`.substring(0, 18)}
        </Link>
      </IconButton>
    </Tooltip>
  ) : (
    routingData.account.items.map((ele, i) => {
      const { title, to } = ele
      return (
        <Typography edge="end" color="inherit" className={classes.h5Link} variant="h5" key={i}>
          <Link to={to} style={styles.link} key={i}>
            {title}
          </Link>
        </Typography>
      )
    })
  )

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        className={clsx(classes.AppBar, { [classes.appBarShift]: openDrawer })}
      >
        <Toolbar>
          <Link to="/" style={styles.link}>
            <Typography className={classes.logo} variant="h4" noWrap>
              Cine+
            </Typography>
          </Link>

          <div className={classes.mainMenu}>
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
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
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
            <Tooltip title="Language: EN">
              <IconButton aria-label="language is english" color="inherit">
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.rightMenu}>{renderAccountActions}</div>
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
      <MenuCreator
        anchorEl={anchorEl.movies}
        id={moviesMenuId}
        items={routingData.movies.items}
        handleMenuClose={handleMenuClose}
      />
      <MenuCreator
        anchorEl={anchorEl.tvShows}
        id={tvShowsMenuId}
        items={routingData.tvShows.items}
        handleMenuClose={handleMenuClose}
      />
      <MenuCreator
        anchorEl={anchorEl.people}
        id={peopleMenuId}
        items={routingData.people.items}
        handleMenuClose={handleMenuClose}
      />
      <Drawer open={openDrawer} handleDrawerClose={handleDrawerClose} data={routingData} />
      <Paper>
        <div className={classes.toolbar}></div>
      </Paper>
      {/* //makes sure content is not hidden under AppBar */}
    </div>
  )
}
