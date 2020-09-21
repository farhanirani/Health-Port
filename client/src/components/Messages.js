import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

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
}));

export default function Album() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState("");
  const [posts, setPosts] = useState([]);
  const [forumName, setForumName] = useState([]);
  const forumId = window.location.pathname.substring(10);
  const tokenn = localStorage.getItem("auth-token");

  const style = {
    display: "block",
    maxHeight: 250,
    width: "auto",
    margin: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const gotohischat = async (e) => {
    history.push("/messages/chat/" + e);
  };

  useEffect(() => {
    (async () => {
      const userrr = await axios.get("/api/users", {
        headers: { "x-auth-token": tokenn },
      });
      setuser(userrr.data.role);
      if (userrr.data.role === "doctor") {
        const postData = await axios.get("/api/docs/getusers4doc", {
          headers: { "x-auth-token": tokenn },
        });
        console.log(postData.data);
        setPosts(postData.data);
        setLoading(false);
      } else {
        const postData = await axios.get("/api/docs/getdoctors");
        console.log(postData.data);
        setPosts(postData.data);
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (user === "user") {
    return (
      <React.Fragment>
        <CssBaseline />
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid} maxWidth="sm">
            <Grid container>
              <Typography
                style={{ marginLeft: 20, paddingBottom: 30 }}
                variant="h6"
                color="inherit"
              >
                All the contacts you can message
              </Typography>
              {posts.map((post) => (
                <Grid item key="hellow" lg={12} style={{ width: "100%" }}>
                  <Card
                    onClick={() => {
                      gotohischat(post._id);
                    }}
                    className={classes.root}
                    style={{
                      borderBottom: "1px solid rgb(200,200,200)",
                    }}
                  >
                    <CardActionArea>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {post.userName.charAt(0)}
                          </Avatar>
                        }
                        title={post.firstName + " " + post.lastName}
                        subheader={"message : " + post.userName}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Loader loading={loading} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid} maxWidth="sm">
            <Grid container>
              {posts.map((post) => (
                <Grid item key="hellow" lg={12} style={{ width: "100%" }}>
                  <Card
                    onClick={() => {
                      gotohischat(post.user);
                    }}
                    className={classes.root}
                    style={{
                      borderBottom: "1px solid rgb(200,200,200)",
                    }}
                  >
                    <CardActionArea>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {post.userName.charAt(0)}
                          </Avatar>
                        }
                        title={post.userName}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <Loader loading={loading} />
      </React.Fragment>
    );
  }
}
