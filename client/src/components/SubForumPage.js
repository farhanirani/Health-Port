import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    Left: 20,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    maxWidth: 500,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Album() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [forumName, setForumName] = useState([]);
  const forumId = window.location.pathname.substring(10);

  const newpost = () => {
    history.push("/newpost");
  };

  useEffect(() => {
    (async () => {
      const postData = await axios.get(
        "http://localhost:5000/api/forum/" + forumId
      );
      console.log(postData);
      setPosts(postData.data.data);
      setForumName(postData.data.forumName);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="sm">
          {/* End hero unit */}
          <Grid container spacing={3}>
            <Grid
              item
              key="New"
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{ width: "100%" }}
            >
              <Card className={classes.root}>
                <CardActionArea onClick={newpost}>
                  <CardContent>
                    <CardMedia
                      className={classes.media}
                      image="https://images.unsplash.com/photo-1597190910481-5a6e500f0fe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                    />
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      classes={classes.heroContent}
                    >
                      {forumName.title}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                      {forumName.description}
                    </Typography>
                    <Divider />
                    <span className={classes.imageButton}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                      >
                        <Box
                          textAlign="center"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            paddingTop: 10,
                            paddingLeft: "40%",
                          }}
                        >
                          <AddCircleOutlineIcon />
                          Add Post
                        </Box>
                        <span className={classes.imageMarked} />
                      </Typography>
                    </span>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            {posts.map((post) => (
              <Grid item key={post._id} lg={12} style={{ width: "100%" }}>
                {/* 
                
                */}
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.authorName.charAt(0)}
                      </Avatar>
                    }
                    title={post.title}
                    subheader={"Posted by " + post.authorName}
                  />
                  <ButtonBase
                    focusRipple
                    key="Title"
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    onClick={() => history.push("/post/" + post._id)}
                  >
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {post.body.substring(0, 100)}
                        {post.body.length <= 100 ? null : "..."}
                      </Typography>
                    </CardContent>
                  </ButtonBase>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <ArrowUpwardIcon />
                    </IconButton>
                    <p>{post.upvotes}</p>
                    <IconButton aria-label="share">
                      <ArrowDownwardIcon />
                    </IconButton>
                    <p>{post.downvotes}</p>
                  </CardActions>
                </Card>
                {/* 
                
                */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Loader loading={loading} />
    </React.Fragment>
  );
}
