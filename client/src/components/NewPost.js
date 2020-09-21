import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import Loader from "./Loader";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [forumName, setForumName] = useState([]);
  const forumId = window.location.pathname.substring(9);
  const tokenn = localStorage.getItem("auth-token");

  useEffect(() => {
    (async () => {
      const postData = await axios.get("/api/forum/" + forumId);
      // console.log(postData);
      setForumName(postData.data.forumName.title);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newPost = {
        wforum: forumId,
        fname: forumName,
        title: title,
        body: body,
      };
      console.log(newPost);
      if (!tokenn) {
        alert("Please login first");
        setLoading(false);
      } else {
        const temp = await axios.post("/api/post/create", newPost, {
          headers: { "x-auth-token": tokenn },
        });
        setLoading(false);
        history.push("/post/" + temp.data._id);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  //

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5" component="h2">
          Create new Post
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Submitting to {forumName} forum
        </Typography>
        <form onSubmit={handleCreatePost} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
            id="title"
            label="Post Title"
            name="title"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            required
            rows="9"
            onChange={(e) => {
              setBody(e.target.value);
            }}
            fullWidth
            id="body"
            label="Post Body"
            name="body"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Loader loading={loading} />
    </Container>
  );
}
