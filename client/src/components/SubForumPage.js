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
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  media: {
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
    width: "100%",
  },
  pos: {
    marginBottom: 12,
  },
  bg: {
    backgroundColor: "#3d4ad9",
    color: "white",
  },
}));

export default function Album() {
  const tokenn = localStorage.getItem("auth-token");
  const [userid, setuserid] = useState("");

  useEffect(() => {
    (async () => {
      const ttt = await axios.get("/api/users", {
        headers: { "x-auth-token": tokenn },
      });
      console.log("running it once");
      console.log(ttt.data.id);
      setuserid(ttt.data.id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [forumName, setForumName] = useState([]);
  const forumId = window.location.pathname.substring(10);

  const newpost = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("auth-token")) {
      alert("Please login first");
      history.push("/login");
    } else {
      history.push("/newpost/" + forumId);
    }
  };

  const handleUpvote = async (e) => {
    // console.log(e);
    setLoading(true);
    if (!localStorage.getItem("auth-token")) {
      alert("Please login first");
      setLoading(false);
    } else {
      try {
        if (!tokenn) {
          alert("Please login first");
          setLoading(false);
        } else {
          const temp = await axios.post(
            "/api/post/postUpvote/" + e,
            {},
            { headers: { "x-auth-token": tokenn } }
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response.data.msg);
        alert(err.response.data.msg);
      }
    }
  };

  const handleDownvote = async (e) => {
    // console.log(e);
    setLoading(true);
    if (!localStorage.getItem("auth-token")) {
      alert("Please login first");
      setLoading(false);
    } else {
      try {
        if (!tokenn) {
          alert("Please login first");
          setLoading(false);
        } else {
          const temp = await axios.post(
            "/api/post/postDownvote/" + e,
            {},
            { headers: { "x-auth-token": tokenn } }
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response.data.msg);
        alert(err.response.data.msg);
      }
    }
  };

  const handleDeletePost = async (e) => {
    setLoading(true);
    if (!localStorage.getItem("auth-token")) {
      alert("Please login first");
      setLoading(false);
    } else {
      try {
        if (!tokenn) {
          alert("Please login first");
          setLoading(false);
        } else {
          const temp = await axios.delete(
            "/api/post/delete/" + e,
            { headers: { "x-auth-token": tokenn } },
            {}
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response.data.msg);
        alert(err.response.data.msg);
      }
    }
  };

  const style = {
    display: "block",
    maxHeight: 200,
    width: "auto",
    margin: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  };

  useEffect(() => {
    (async () => {
      const postData = await axios.get("/api/forum/" + forumId);

      // console.log(postData);
      setPosts(postData.data.data);
      setForumName(postData.data.forumName);

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <React.Fragment>
      <CssBaseline />
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
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
                <CardContent>
                  <CardMedia>
                    <img src={forumName.url} style={style} />
                  </CardMedia>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    classes={classes.heroContent}
                  >
                    <Box textAlign="center" marginTop={1}>
                      {forumName.title}
                    </Box>
                  </Typography>

                  <Typography className={classes.pos} color="textSecondary">
                    <Box textAlign="center" marginTop={1}>
                      {forumName.description}
                    </Box>
                  </Typography>
                  <Divider />
                  <CardActionArea onClick={newpost}>
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
                            paddingBottom: 5,
                            paddingLeft: "40%",
                          }}
                        >
                          <AddCircleOutlineIcon
                            style={{
                              marginLeft: 20,
                              marginRight: 10,
                            }}
                          />
                          Add Post
                        </Box>
                        <span className={classes.imageMarked} />
                      </Typography>
                    </span>
                  </CardActionArea>
                </CardContent>
              </Card>
            </Grid>
            {posts.map((post) => (
              <Grid item key={post._id} lg={12} style={{ width: "100%" }}>
                {/* 
                
                */}
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        className={
                          post.authorrole === "doctor"
                            ? classes.bg
                            : classes.avatar
                        }
                      >
                        {post.authorName.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <Button
                        color="secondary"
                        onClick={() => {
                          handleDeletePost(post._id);
                        }}
                      >
                        {post.author === userid ? "Delete" : ""}
                      </Button>
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
                      <Typography variant="body2" component="p">
                        <Box textAlign="left">
                          {post.body.substring(0, 200)}
                          {post.body.length <= 200 ? null : "..."}
                        </Box>
                      </Typography>
                    </CardContent>
                  </ButtonBase>
                  <CardActions disableSpacing>
                    <IconButton
                      onClick={() => {
                        handleUpvote(post._id);
                      }}
                      aria-label="add to favorites"
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <p>{post.upvotes.length}</p>
                    <IconButton
                      onClick={() => {
                        handleDownvote(post._id);
                      }}
                      aria-label="share"
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <p>{post.downvotes.length}</p>
                  </CardActions>
                </Card>
                {/* 
                
                */}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Loader loading={loading} />;
    </React.Fragment>
  );
}
