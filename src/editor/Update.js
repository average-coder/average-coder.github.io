import React, {useEffect, useState} from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost, updatePost } from '../redux/actions/posts';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PhotoUploader from './PhotoUploader';



const mdParser = new MarkdownIt();

const Update = props => {

    const slug = props.match.params.slug;
    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    useEffect(() => {
        props.getPost(slug);
        setTitle(props.posts.title);
        setPost(props.posts.data);
    }, [slug])
    
    return (
        <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            style={{ minHeight: "90vh", padding: 10, maxWidth: "99vw" }}
        >
            <Grid item>
                <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(text) => { setTitle(text.target.value) }} />
            </Grid>
            <Grid item>
                <MdEditor
                    value={post}
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ html, text }) => { setPost(text) }}
                />
            </Grid>

            <Grid item>
                <Paper variant="outlined">
                    <PhotoUploader />
                </Paper>
            </Grid>

            <Grid item>
                <Button variant="outlined" color="primary" onClick={() => { props.updatePost(title, post, props.posts.id) }}>
                    POST
</Button>
            </Grid>

        </Grid>
    )
}

Update.propTypes = {
    posts: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    posts: state.posts
})


export default connect(mapStateToProps, { getPost, updatePost })(Update)
