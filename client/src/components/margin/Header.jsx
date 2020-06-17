/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import createHistory from 'history/createBrowserHistory';
import { useAuth0 } from '../../authentication/react-auth0-spa';
import colors from '../../constants/colors';

const history = createHistory({ forceRefresh: true });

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: colors.white,
  },
  login: {
    fontSize: '18px',
    backgroundColor: colors.darkBlue,
    color: colors.white,
    '&:hover': {
      backgroundColor: colors.darkBlue,
    },
  },
  title: {
    padding: '25px 5px',
    textTransform: 'uppercase',
    flexGrow: 1,
  },
  titleLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  accountIcon: {
    color: theme.palette.primary.main,
    fontSize: 60,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  menuItem: {
    width: '100%',
    backgroundColor: colors.white,
    color: colors.darkBlue,
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: colors.lightBlue,
    },
    '&:focus': {
      backgroundColor: colors.lightBlue,
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleMenuClose();
    logout();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Link className={classes.link} to='/profile'>
        <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
          Profile
        </MenuItem>
      </Link>
      <MenuItem className={classes.menuItem} onClick={handleLogOut}>
        Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position='static' className={classes.bar}>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            <Link className={classes.titleLink} onClick={() => history.push('/')}>
              Clinic Recommender
            </Link>
          </Typography>
          {!isAuthenticated && (
            <Button
              className={classes.login}
              variant='contained'
              onClick={() => loginWithRedirect({})}
            >
              Log in
            </Button>
          )}
          {isAuthenticated && (
            <IconButton variant='contained' onClick={handleProfileMenuOpen}>
              <AccountCircleIcon className={classes.accountIcon} />
            </IconButton>
          )}

        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Header;
