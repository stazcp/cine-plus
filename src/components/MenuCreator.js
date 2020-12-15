import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

const styles = {
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}

export default function MenuCreator({ anchorEl, id, open, handleMenuClose, items }) {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={id}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {items.map((item, i) => {
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
