import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { getEditorPosts, deletePost } from '../redux/actions/editor';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {convert} from '../common/Time';

const useStyles = makeStyles((theme)=>({
    root: {
        maxWidth: 345,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      paper: {
        background: 'rgba(0, 0, 0, 0.74)',
        minWidth: '30vw',
        minHeight: '20vh',
    }
  }));


const EditorHome = (props) => {

    const classes = useStyles();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        props.getEditorPosts();
        return () => {
            
        }
    }, [])

    const res_arr = (props.posts).map((item)=>{
        return(
          <Grid item>
             <Card className={classes.root}>
                 <CardActionArea component={Link} to={"/post/"+item.slug}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {convert(item.date_posted)}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small">EDIT</Button>
          <Button size="small" onClick={()=>{setVisible(item.id)}}>DELETE</Button>
        </CardActions>
      </Card>
          </Grid>
        )
      })

    return (
        <Container>
          <Box>
          <Modal 
            open={visible !== false} 
            className={classes.modal}
            onBackdropClick={()=>{setVisible(false)}}
            >
               <Paper className={classes.paper}>
               <Grid container justify="center" alignItems="center" direction="column" >
                <Grid item style={{padding:10}}>
                  <Typography variant="h6" color="secondary">
                    Are you sure you want to delete this post?
                  </Typography>
                </Grid>
                <Grid item style={{padding:10}}>
                <Grid container justify="center" alignItems="center" direction="row" spacing={3}>
                  <Grid item>
                  <Button color="secondary" variant="outlined" onClick={()=>{props.deletePost(visible); setVisible(false);}}>YES</Button>
                  </Grid>
                  <Grid item>
                  <Button color="secondary" variant="outlined" onClick={()=>{setVisible(false)}}>NO</Button>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
               </Paper>
            </Modal>
          </Box>
            <Grid 
            container
            style={{padding:10}}
            alignItems="center"
            direction="column"
            justify="flex-start"
            spacing={2}
            >
                <Grid item>
                    <Typography variant="h4" component="h4">
                        Welcome {props.user.first_name} {props.user.last_name} (@{props.user.username})
                    </Typography>
                </Grid>
                <Grid item>
                <Divider light />
                <Grid 
                container
                style={{paddingTop: 20, paddingBottom: 20}}
                alignItems="center"
                direction="row"
                justify="center"
                spacing={2}
                >
                    {res_arr}
                </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

EditorHome.propTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    getEditorPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    user: state.auth.user,
    posts: state.editor.posts,
})

export default connect(mapStateToProps, {getEditorPosts, deletePost})(EditorHome)

