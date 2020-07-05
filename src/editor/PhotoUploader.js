import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { addImage, removeImage } from '../redux/actions/images';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { pushMessage } from '../redux/actions/alerts';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}));


const PhotoUploader = props => {

  const classes = useStyles();

  const res_arr = (props.images).map((item) => {
    return (
      <Grid item key={item.id}>
        <Card className={classes.root} variant="outlined">
          <CardActionArea onClick={() => { navigator.clipboard.writeText(item.image); props.pushMessage("LINK COPIED"); }}>
            <CardMedia
              component="img"
              alt="uploaded"
              height="140"
              src={item.image}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" noWrap>
                {item.image}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" startIcon={<DeleteIcon />} onClick={() => { props.removeImage(item.id) }}>
              DELETE
        </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  })

  return (
    <Fragment>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
        style={{ padding: 10 }}
      >
        <Grid item>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={(e) => { props.addImage(e.target.files[0]) }}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" color="primary" startIcon={<CloudUploadIcon />}>
              UPLOAD IMAGE
        </Button>
          </label>
        </Grid>
      </Grid>
      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
        style={{ padding: 10 }}
      >
        {res_arr}
      </Grid>
    </Fragment>
  )
}

PhotoUploader.propTypes = {
  addImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  pushMessage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  images: state.images.images
})

export default connect(mapStateToProps, { addImage, removeImage, pushMessage })(PhotoUploader)
