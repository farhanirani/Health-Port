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
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
  const [posts, setPosts] = useState([]);
  const [forumName, setForumName] = useState([]);
  const forumId = window.location.pathname.substring(10);

  const style = {
    display: "block",
    maxHeight: 250,
    width: "auto",
    margin: "auto",
    marginLeft: "auto",
    marginRight: "auto",
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
          <Typography component="h1" variant="h5">
            <Box align="center" marginBottom="5%">
              Doctor's Approval List
            </Box>
          </Typography>
          <Grid container spacing={3}>
            <Grid item key="hellow" lg={12} style={{ width: "100%" }}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <form>
                      <IconButton>
                        <CheckCircleOutlineIcon
                          onClick={null}
                          style={{ fill: "green" }}
                        ></CheckCircleOutlineIcon>
                      </IconButton>
                      <IconButton>
                        <HighlightOffIcon
                          color="inherit"
                          onClick={null}
                          style={{ fill: "red" }}
                        ></HighlightOffIcon>
                      </IconButton>
                    </form>
                  }
                  title="First Name Last Name"
                  subheader="Email "
                />
                <CardMedia
                  className={classes.media}
                  image="https://images.unsplash.com/photo-1559588501-59a118c47e59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                  title="Paella dish"
                />
              </Card>
              {/* 
                
                */}
            </Grid>
          </Grid>
        </Container>
      </main>
      <Loader loading={loading} />
    </React.Fragment>
  );
}
