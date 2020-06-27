import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestPost } from '../redux/actions/requestpost';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ReCAPTCHA from 'react-google-recaptcha';
import Box from '@material-ui/core/Box';
import {Helmet} from "react-helmet";

const RequestPost = props => {

    const [req, setReq] = useState('');
    const [captcha, setCaptcha] = useState(false);
    const [responseG, setResponseG] = useState(null);
    const recaptchaRef = React.createRef();

    useEffect(()=>{
      return () =>{
        setReq('');
      }
    }, [])
    
    const handleCaptcha = (key) => {
      setCaptcha(true);
      setResponseG(key);
    }

    return (
        <Container>
          <Box>
            <Helmet>
                <title>Request Post</title>
                <meta name="description" content="Request a topic to be covered." />
                <meta name="author" content="average coder" />
                <meta name="keywords" content="Request, Post" /> 
            </Helmet>
            </Box>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={5}
          style={{ minHeight: "90vh" }}
        >
        <Grid item>
            <Typography variant="h2">
            Please submit your requests here, we will try to cover them as soon as possible.
        </Typography>
        </Grid>
        <Grid
        item>
        <TextField
          id="outlined-multiline-static"
          label="Request Post"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          onChange={(e)=>{setReq(e.target.value)}}
          value={req}
        />
        </Grid>
        <Grid item>
        <ReCAPTCHA 
          onChange={handleCaptcha}
          sitekey="6LdnoakZAAAAAOGTWArg4w2etfWRqqBLTvrIhJOI"
          theme="dark"
          ref={recaptchaRef}
        />
        </Grid>
        <Grid item>
        <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        onClick={()=>{props.requestPost(req, captcha, responseG); recaptchaRef.current.reset();}}
        >
        Send
      </Button>
        </Grid>
        </Grid>
        </Container>
    )
}

RequestPost.propTypes = {
    requestPost: PropTypes.func.isRequired
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps, {requestPost})(RequestPost)
