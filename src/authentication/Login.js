import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    if(props.auth.isAuthenticated)
    {
      return <Redirect to="/ehome"/>
    }

    return (
        
            <Container>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
          style={{ minHeight: "90vh" }}
        >
            <Grid item>
                <TextField
                variant="outlined"
                label="Username"
                 onChange={(text)=>{setUsername(text.target.value)}}
                />
            </Grid>
            <Grid item>
                <TextField
                variant="outlined"
                type="password"
                label="Password"
                 onChange={(text)=>{setPassword(text.target.value)}}
                />
            </Grid>
            <Grid item>
            <Button
            variant="contained"
            color="primary"
            onClick={()=>props.login(username, password)}
            >
                Login
      </Button>
            </Grid>

        </Grid>
        </Container>
            
    )
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login)