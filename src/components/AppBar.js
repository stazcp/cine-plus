import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
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
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
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
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [moreAnchor, setMoreAnchor] = React.useState(null);
  const [peopleAnchor, setPeopleAnchor] = React.useState(null);
  const [tvShowsAnchor, setTvShowsAnchor] = React.useState(null);
  const [moviesAnchor, setMoviesAnchor] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMoreMenuOpen = Boolean(moreAnchor)
  const isPeopleMenuOpen = Boolean(peopleAnchor);
  const isTvShowsMenuOpen = Boolean(tvShowsAnchor);
  const isMoviesMenuOpen = Boolean(moviesAnchor);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMoviesMenuOpen = (event) => {
    setMoviesAnchor(event.currentTarget);
    event.preventDefault();
  };

  const handleTvShowsMenuOpen = (event) => {
    setMoviesAnchor(event.currentTarget);
    event.preventDefault();
  };

  const handleMoreMenuOpen = (event) => {
    setMoreAnchor(event.currentTarget);
    event.preventDefault();
  }

  const handlePeopleMenuOpen = (event) => {
    setPeopleAnchor(event.currentTarget);
    event.preventDefault();
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMoviesAnchor(null);
    setMoreAnchor(null);
    setPeopleAnchor(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const moviesMenuId = 'movies-menu';
  const renderMoviesMenu = (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={moviesAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={moviesMenuId}
      keepMounted
      open={isMoviesMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Popular</MenuItem>
      <MenuItem onClick={handleMenuClose}>Now Playing</MenuItem>
      <MenuItem onClick={handleMenuClose}>Upcoming</MenuItem>
      <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
    </Menu>
  );

  const tvShowsMenuId = 'tv-shows-menu';
  const renderTVShowsMenu = (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={moviesAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={tvShowsMenuId}
      keepMounted
      open={isTvShowsMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Popular</MenuItem>
      <MenuItem onClick={handleMenuClose}>Now Playing</MenuItem>
      <MenuItem onClick={handleMenuClose}>Upcoming</MenuItem>
      <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
    </Menu>
  );

  const peopleMenuId = 'people-menu';
  const renderPeopleMenu = (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={peopleAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={peopleMenuId}
      keepMounted
      open={isPeopleMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Popular</MenuItem>
      <MenuItem onClick={handleMenuClose}>Now Playing</MenuItem>
      <MenuItem onClick={handleMenuClose}>Upcoming</MenuItem>
      <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
    </Menu>
  );

  const moreMenuId = 'more-menu';
  const renderMoreMenu = (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={moreAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={moreMenuId}
      keepMounted
      open={isMoreMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Popular</MenuItem>
      <MenuItem onClick={handleMenuClose}>Now Playing</MenuItem>
      <MenuItem onClick={handleMenuClose}>Upcoming</MenuItem>
      <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem></MenuItem> 4 menus go here */}
      <MenuItem>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography className={classes.h2Link} variant="h2" noWrap>
            <Link href="/" color="inherit" underline="none" className="nav-link">
              Cine+
            </Link>
          </Typography>
          <div className={classes.mainMenu}>
            <Typography
              edge="end"
              aria-label="movies menu"
              aria-controls={moviesMenuId}
              aria-haspopup="true"
              onClick={handleMoviesMenuOpen}
              onMouseOver={handleMoviesMenuOpen}
              // onMouseLeave={handleMenuClose} crashes
              color="inherit"
              className={classes.h5Link}
              variant="h5"
            >
              <Link href="/" color="inherit" underline="none" className="nav-link">
                Movies
              </Link>
            </Typography>
            <Typography
              edge="end"
              aria-label="tv shows menu"
              aria-controls={tvShowsMenuId}
              aria-haspopup="true"
              onClick={handleMoviesMenuOpen}
              onMouseOver={handleMoviesMenuOpen}
              // onMouseLeave={handleMenuClose} crashes
              color="inherit"
              className={classes.h5Link}
              variant="h5"
            >
              <Link href="/" color="inherit" underline="none" className="nav-link">
                TV Shows
              </Link>
            </Typography>
            <Typography
              edge="end"
              aria-label="people menu"
              aria-controls={peopleMenuId}
              aria-haspopup="true"
              onClick={handlePeopleMenuOpen}
              onMouseOver={handlePeopleMenuOpen}
              // onMouseLeave={handleMenuClose} crashes
              color="inherit"
              className={classes.h5Link}
              variant="h5"
            >
              <Link href="/" color="inherit" underline="none" className="nav-link">
                People
              </Link>
            </Typography>
            <Typography
              edge="end"
              aria-label="more menu"
              aria-controls={moreMenuId}
              aria-haspopup="true"
              onClick={handleMoreMenuOpen}
              onMouseOver={handleMoreMenuOpen}
              // onMouseLeave={handleMenuClose} crashes
              color="inherit"
              className={classes.h5Link}
              variant="h5"
            >
              <Link href="/" color="inherit" underline="none" className="nav-link">
                More
              </Link>
            </Typography>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show" color="inherit">
              <Badge color="secondary">
                {/* popup goes here */}
                <AddIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show" color="inherit">
              <Badge color="secondary">
                {/* languages? */}
                <LanguageIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              onMouseOver={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
      {renderPeopleMenu}
      {renderMoreMenu}
      {renderMoviesMenu}
      {renderTVShowsMenu}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
