import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 345,
  },
  focusVisible: {},

}));

export default function ImgMediaCard() {
  const classes = useStyles();

  return (   
    <Card className={classes.root} >
        <ButtonBase
          focusRipple
          key='Title'
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '345',
          }}
          onClick={() => { alert('clicked') }}
        >
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://source.unsplash.com/random"
          title="Sub Thread Info"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      </ButtonBase>
    </Card>
  );
}
