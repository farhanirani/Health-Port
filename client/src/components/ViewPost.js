import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CommentIcon from "@material-ui/icons/Comment";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Divider } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  grap: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  textFieldCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    width: "100%",
    backgroundColor: "#fff",
    paddingRight: 5,
    paddingLeft: 5,
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ marginLeft: "10%", marginTop: 10, marginBottom: 15 }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="Posted in r/subreddit"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ArrowUpwardIcon />
        </IconButton>
        <p>N</p>
        <IconButton aria-label="share">
          <ArrowDownwardIcon />
        </IconButton>
        <p>N</p>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <p>N</p>
      </CardActions>
      <CardContent>
        <Divider style={{ margin: 5 }} />
        <Typography gutterBottom variant="h5" component="h3">
          Comments (No.)-
        </Typography>
        <Paper component="form" className={classes.grap}>
          <Input
            required
            className={classes.textField}
            variant="outlined"
            placeholder="Enter a comment"
            value={null}
            onChange={null}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SendIcon />
          </IconButton>
        </Paper>
        <Card style={{ paddingLeft: 6, paddingTop: 5, marginBottom: 5 }}>
          <Typography gutterBottom component="h6">
            <a href="/" style={{ color: "black" }}>
              Lizard
            </a>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ArrowUpwardIcon />
            </IconButton>
            <p>N</p>
            <IconButton aria-label="share">
              <ArrowDownwardIcon />
            </IconButton>
            <p>N</p>
          </CardActions>
        </Card>
        <Divider style={{ margin: 5 }} />

        <Card style={{ paddingLeft: 5, paddingTop: 5, marginBottom: 5 }}>
          <Typography gutterBottom component="h6">
            <a href="/" style={{ color: "black" }}>
              Lizard
            </a>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ArrowUpwardIcon />
            </IconButton>
            <p>N</p>
            <IconButton aria-label="share">
              <ArrowDownwardIcon />
            </IconButton>
            <p>N</p>
          </CardActions>
        </Card>
        <Divider style={{ margin: 5 }} />
        <Card style={{ paddingLeft: 5, paddingTop: 5, marginBottom: 5 }}>
          <Typography gutterBottom component="h6">
            <a href="/" style={{ color: "black" }}>
              Lizard
            </a>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <ArrowUpwardIcon />
            </IconButton>
            <p>N</p>
            <IconButton aria-label="share">
              <ArrowDownwardIcon />
            </IconButton>
            <p>N</p>
          </CardActions>
        </Card>
      </CardContent>
    </Card>
  );
}
