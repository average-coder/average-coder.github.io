import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { logout } from '../redux/actions/auth';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Home"  component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AvgCdr
          </Typography>
          {
            props.auth.isAuthenticated ?
            <>
            <Button component={Link} to="/ehome" color="inherit">Dash</Button>
            <Button component={Link} to="/editor" color="inherit">Editor</Button>
            <Button color="inherit" onClick = {()=>props.logout()}>Logout</Button> 
            </>
            :
            <>
            <Button component={Link} to="/request-post" color="inherit">Request New Post</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired, 
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)