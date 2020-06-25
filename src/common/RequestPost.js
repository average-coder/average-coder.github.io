import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestPost } from '../redux/actions/requestpost';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


const RequestPost = props => {

    const [req, setReq] = useState('');

    return (
        <Container>
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
        <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        onClick={()=>{props.requestPost(req)}}
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
