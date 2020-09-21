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
  const [moviesAnchor, setMoviesAnchor] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMoviesMenuOpen = Boolean(moviesAnchor);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMoviesMenuOpen = (event) => {
    setMoviesAnchor(event.currentTarget);
    event.preventDefault();
  };

  const handleMoviesMenuClose = () => {
    setMoviesAnchor(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const moviesMenuId = 'movies-menu';
  const renderMoviesMenu = (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={moviesAnchor}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={moviesMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMoviesMenuOpen}
      onClose={handleMoviesMenuClose}
    >
      <MenuItem onClick={handleMoviesMenuClose}>Popular</MenuItem>
      <MenuItem onClick={handleMoviesMenuClose}>Now Playing</MenuItem>
      <MenuItem onClick={handleMoviesMenuClose}>Upcoming</MenuItem>
      <MenuItem onClick={handleMoviesMenuClose}>Top Rated</MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
              color="inherit"
              className={classes.h5Link}
              variant="h5"
            >
              <Link href="/" color="inherit" underline="none" className="nav-link">
                Movies
              </Link>
            </Typography>
            <Typography className={classes.h5Link} variant="h5">
              <Link href="/" color="inherit" underline="none" className="nav-link">
                TV Shows
              </Link>
            </Typography>
            <Typography className={classes.h5Link} variant="h5">
              <Link href="/" color="inherit" underline="none" className="nav-link">
                People
              </Link>
            </Typography>
            <Typography className={classes.h5Link} variant="h5">
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
      {renderMoviesMenu}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
