import React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../redux/actions/posts';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PhotoUploader from './PhotoUploader';
import usePersistedState from '../mis/CustomHook';



const mdParser = new MarkdownIt();

const EditorMD = props => {

  const [title, setTitle] = usePersistedState('title', '');
  const [post, setPost] = usePersistedState('post', '');
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
        <Button variant="outlined" color="primary" onClick={() => {props.addPost(title, post)}}>
          POST
</Button>
      </Grid>

    </Grid>
  )
}

EditorMD.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps, { addPost })(EditorMD)
