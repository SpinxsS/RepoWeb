import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core'


//Coloca el estilo a la card en donde se muestran las películas de la api
const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {

  const { classes } = props;

  return (
    <Card className={classes.card} style={{ maxWidth: 'min-content' }}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.datos.Title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {'Kind: ' + props.datos.Type + ' Year: ' + props.datos.Year}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Grid container justify="center">
            <Grid item>
              <Button onClick={() => props.clickmodal(props.datos)} variant="contained" color="secondary">Ver más</Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.datos.Poster}
        title="Live from space album cover"
      />
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);