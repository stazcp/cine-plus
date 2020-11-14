import React, { useState, useContext } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/FirebaseContext'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}))

export default function PersistentDrawerRight({ open, handleDrawerClose, data }) {
  const classes = useStyles()
  const theme = useTheme()
  const [display, setDisplay] = useState(Object.values(data))
  let history = useHistory()
  const { user } = useContext(FirebaseContext)

  const handleClick = (item) => {
    if (!item?.items || (item.title === 'Account' && user)) {
      history.push(item.to)
    } else {
      setDisplay(item.items)
    }
  }

  const goBack = () => {
    setDisplay(Object.values(data))
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <IconButton onClick={goBack}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {display.map((ele, index) => {
          console.log(ele)
          if (ele === 'divide') {
            return <Divider />
          } else {
            return (
              <ListItem button key={ele.title} onClick={() => handleClick(ele)}>
                <ListItemIcon> {ele.icon}</ListItemIcon>
                <ListItemText primary={ele.title} />
              </ListItem>
            )
          }
        })}
      </List>
    </Drawer>
  )
}
