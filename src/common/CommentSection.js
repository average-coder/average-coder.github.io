import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ReplyIcon from '@material-ui/icons/Reply';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import { addComment, addSubComment } from '../redux/actions/comments';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {convert} from './Time';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      },

    paper: {
        minWidth: '50vw',
        minHeight: '50vh',
        
    }
  }));

export const CommentSection = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        
        return () => {
            clearState();
            setExpanded(false);
            setVisible(false);
            setType(null);
        }
    }, [])

    const clearState = () =>{
        setName('');
        setComment('');
    }

    const handleChange = (id) =>{
        if(expanded === false){
            setExpanded(id);
        }
        else if(expanded === id)
        {
            setExpanded(false);
        }
        else if(expanded !== id && expanded !== false)
        {
            setExpanded(false);
            setExpanded(id);
        }
    }

    return (
        <Fragment>
            <Box>
                <Modal 
                open={visible} 
                className={classes.modal}
                onBackdropClick={()=>{setVisible(false)}}
                >
                    <Paper className={classes.paper}>
                <Grid
                container
                direction="column"
                justify="center"
                style={{ padding: 10 }}
                >
            <Grid item style={{ padding: 10 }}>
                <TextField
                variant="outlined"
                label="Name"
                fullWidth
                 onChange={(text)=>{setName(text.target.value)}}
                />
            </Grid>
            <Grid item style={{ padding: 10 }}>
                <TextField
                variant="outlined"
                label="Comment"
                multiline
                fullWidth
                rows={10}
                 onChange={(text)=>{setComment(text.target.value)}}
                />
            </Grid>
            <Grid item style={{ padding: 10 }}>
            <Button
            variant="contained"
            color="primary"
            onClick={()=>{
                type === "cmt" ? props.addComment(name, comment, props.id) : props.addSubComment(name, comment, type)
                setVisible(false);
                clearState();
            }}
            >
                Post
            </Button>
                    </Grid>

                </Grid>
                </Paper>
                </Modal>
            </Box>
            <Box>
                <Grid 
                container
                style={{paddingLeft: 10, paddingRight: 10}}
                alignItems="center"
                direction="row"
                justify="space-between"
                >
                    <Grid item >
                        <Typography variant="h6" component="h6">
                            Comments
                        </Typography>
                    </Grid>
                    <Grid item >
                        <IconButton onClick={() => {setVisible(true); setType("cmt");}}>
                            <AddBoxIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                    <Grid 
                    container
                    spacing={2}
                    direction="column"
                    justify="center"
                    >
                        {props.comments?
                            (props.comments).map((item)=>(
                        <Grid item key={item.id}>
                            <Paper elevation={2}>
                            <Grid 
                            container
                            style={{paddingLeft: 10, paddingRight: 10}}
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            >
                            <Grid item>
                                <Typography variant="subtitle2">
                                    {item.data}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={()=>{handleChange(item.id)}}>
                            { expanded === item.id? <KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/> }
                                </IconButton>
                                <IconButton onClick={() => {setVisible(true); setType(item.id);}}>
                                    <ReplyIcon/>
                                </IconButton>
                            </Grid>
                            </Grid>
                            <Grid 
                            container
                            style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 2}}
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            key={"info"+item.id}
                            >
                                <Grid item key={"name"+item.id}>
                                <Typography variant="caption">
                                    @{item.name}
                                </Typography>
                            </Grid>
                            <Grid item key={"date"+item.id}>
                            <Typography variant="caption" >
                                    {convert(item.date_posted)}
                                </Typography>
                            </Grid>
                            </Grid>
                                {item.sub_comments && expanded === item.id?
                                <Grid 
                                container
                                spacing={2}
                                direction="column"
                                justify="center"
                                style={{paddingTop: 10, paddingLeft: 15, paddingRight: 15}}
                                key={"sub"+item.id}
                                >
                                {
                                (item.sub_comments).map((cmnt)=>(
                                    <Fragment key={cmnt.id}>
                                    <Grid item key={"d"+cmnt.id}>
                                        <Divider light />
                                    </Grid>
                                    <Grid item key={"data"+cmnt.id}>
                                <Typography variant="body2">{cmnt.data}</Typography>
                                <Grid 
                            container
                            style={{padding: 10}}
                            alignItems="center"
                            direction="row"
                            justify="space-between"
                            key={"info"+cmnt.id}
                            >
                                <Grid item key={"name"+cmnt.id}>
                                <Typography variant="caption">
                                    @{cmnt.name}
                                </Typography>
                            </Grid>
                            <Grid item key={"date"+cmnt.id}>
                            <Typography variant="caption">
                                    {convert(cmnt.date_posted)}
                                </Typography>
                            </Grid>
                            </Grid>
                                    </Grid>
                                    </Fragment>
                                ))}
                                </Grid>
                                :null    
                            }
                            
                            </Paper>
                        </Grid>
                            )) : null
                        }
                    </Grid>
            </Box>
        </Fragment>
    )
}

CommentSection.propTypes = {
    comments: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    comments: state.posts.comments,
    id: state.posts.id,
})

const mapDispatchToProps = {
    addComment,
    addSubComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection)
