import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { getSuggestions } from '../redux/actions/suggestions';
import { Link } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import { convert } from './Time';
import Box from '@material-ui/core/Box';
import { Helmet } from "react-helmet";


const useStyles = makeStyles((theme) => ({
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
  root1: {
    minWidth: 275,
    maxWidth: 275,
    margin: "auto",
    transition: "0.3s",
    backgroundColor: "#000000",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(1,1,1,0.3)",
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
}));

const Home = (props) => {

  useEffect(() => {
    props.getSuggestions();
    return () => {
      setSearch('');
    }
  }, [])

  const classes = useStyles();
  const [search, setSearch] = useState('');

  const submit = (e) => {
    e.preventDefault();
    props.history.push('/search/' + search);
  }

  return (
    <Container>
      <Box>
        <Helmet>
          <title>Average Coder</title>
          <meta name="description" content="A programming tutorial website." />
          <meta name="author" content="average coder" />
          <meta name="keywords" content="Programming, Tutorial, Django, React, JS, HTML, CSS" />
        </Helmet>
      </Box>
      <form onSubmit={submit}>
        <Grid
          container
          direction="column"
          justify="center"
          spacing={1}
          style={{ minHeight: "50vh" }}
        >
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
        </Grid>
      </form>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid
          item
        >
          <Card className={classes.root1} >
            <CardContent>
              <Typography variant="h5" component="h2" style={{color: "#ffffff"}}>
                Here are some posts you may be interested in
        </Typography>
            </CardContent>
          </Card>
        </Grid>
        {
          (props.suggestions).map((item) => (
            <Grid item key={item.id}>
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
          ))
        }
      </Grid>
    </Container>
  );
}

Home.propTypes = {
  suggestions: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  suggestions: state.suggestions.suggestions
})

export default connect(mapStateToProps, { getSuggestions })(Home)