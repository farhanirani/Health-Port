import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    [theme.breakpoints.up("xs")]: {
      maxWidth: "100%",
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [forums, setForums] = useState([]);

  useEffect(() => {
    (async () => {
      const forumdata = await axios.get("http://localhost:5000/api/forum");
      setForums(forumdata.data);
      setLoading(false);
    })();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <CssBaseline />

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={3}>
            {forums.map((forum) => (
              <Grid item key={forum._id} xs={12} sm={6} md={4} lg={3}>
                {/*
                 */}
                <Card
                  onClick={() => history.push("/subforum/" + forum._id)}
                  className={classes.root}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image="https://images.unsplash.com/photo-1597155941322-009a0dc71888?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=626&q=80"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {forum.title}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {forum.description}
                      </Typography>
                      <br></br>
                      <Typography className={classes.pos} color="textSecondary">
                        {forum.numberOfPosts} posts
                      </Typography>
                    </CardContent>
                  </CardActionArea>
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
