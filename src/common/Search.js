import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { getSearch } from '../redux/actions/search';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import { convert } from './Time';
import Box from '@material-ui/core/Box';
import { Helmet } from "react-helmet";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,

    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const Search = props => {

  const classes = useStyles();

  const [search, setSearch] = useState(props.match.params.title);

  useEffect(() => {
    props.getSearch(props.match.params.title);
  }, [props.match.params.title])

  const submit = (e) => {
    e.preventDefault();
    props.history.push('/search/' + search);
  }

  const res_arr = (props.result).map((item) => {
    return (
      <Grid item>
        <Card className={classes.root}>
          <CardActionArea component={Link} to={"/post/" + item.slug}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {convert(item.date_posted)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  })

  return (
    <Container>
      <Box>
        <Helmet>
          <title>SEARCH - {props.match.params.title}</title>
          <meta name="description" content={props.match.params.title} />
          <meta name="author" content="average coder" />
          <meta name="keywords" content={props.match.params.title} />
        </Helmet>
      </Box>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={1}
        style={{ minHeight: "15vh" }}
      >
        <form onSubmit={submit}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => { setSearch(e.target.value) }}
            value={search}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label="search" type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        style={{ minHeight: "75vh" }}
      >
        {res_arr}
      </Grid>
    </Container>
  )
}

Search.propTypes = {
  result: PropTypes.array.isRequired,
  search_text: PropTypes.string.isRequired,
  getSearch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  result: state.search.result,
  search_text: state.search.search_text
})

export default connect(mapStateToProps, { getSearch })(Search)
