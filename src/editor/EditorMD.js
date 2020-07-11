import React, { useEffect } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost, getPost, updatePost } from '../redux/actions/posts';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PhotoUploader from './PhotoUploader';
import usePersistedState from '../mis/CustomHook';



const mdParser = new MarkdownIt();

const EditorMD = props => {

  const slug = props.match.params.slug
  useEffect(() => {
    slug && props.getPost(slug)
  }, [slug])


  const [title, setTitle] = usePersistedState('title', props.posts.title);
  const [post, setPost] = usePersistedState('post', props.posts.data);
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
        <Button variant="outlined" color="primary" onClick={() => { slug? props.updatePost(title, post, props.posts.id):props.addPost(title, post) }}>
          POST
</Button>
      </Grid>

    </Grid>
  )
}

EditorMD.propTypes = {
  addPost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  posts: state.posts
})


export default connect(mapStateToProps, { addPost, getPost, updatePost })(EditorMD)
