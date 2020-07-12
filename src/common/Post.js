import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost, clearPost } from '../redux/actions/posts';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CommentSection from './CommentSection';
import { convert } from './Time';
import Box from '@material-ui/core/Box';
import { Helmet } from "react-helmet";

var Markdown = require('react-markdown-it')

const Post = props => {

    const slug = props.match.params.slug
    useEffect(() => {
        props.getPost(slug)
        return() =>{
            props.clearPost()
        }
    }, [slug])


    return (
        <Container>
            <Box>
                <Helmet>
                    <title>{props.posts.title}</title>
                    <meta name="description" content={props.posts.title} />
                    <meta name="author" content={props.posts.username} />
                    <meta name="keywords" content={props.posts.slug} />
                </Helmet>
            </Box>
            <Grid
                container
                direction="column"
                spacing={3}
                style={{ minHeight: "90vh" }}
            >
                <Grid item>
                    <Typography variant="h2" component="h2">
                        {props.posts.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">
                        Written by {props.posts.username}, {convert(props.posts.date_posted)}
                    </Typography>
                </Grid>
                <Divider light />
                <Grid item>
                    <div className="markdown-body">
                        <Markdown source={props.posts.data} />
                    </div>
                </Grid>
                <Divider light />
                <Grid item>
                    <CommentSection />
                </Grid>
            </Grid>
        </Container>

    )
}

Post.propTypes = {

    posts: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    clearPost: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    posts: state.posts
})

export default connect(mapStateToProps, { getPost, clearPost })(Post)
