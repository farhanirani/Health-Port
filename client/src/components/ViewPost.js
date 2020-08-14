import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import Loader from "./Loader";

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
import Button from "@material-ui/core/Button";

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
  const [loading, setLoading] = useState(true);
  const [body, setComment] = useState();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const tokenn = localStorage.getItem("auth-token");
  const postId = window.location.pathname.substring(6);

  useEffect(() => {
    (async () => {
      const postData = await axios.get(
        "http://localhost:5000/api/post/" + postId
      );
      // console.log(postData);
      setPost(postData.data);

      const commentData = await axios.get(
        "http://localhost:5000/api/post/getComments/" + postId
      );
      // console.log(commentData);
      setComments(commentData.data);

      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const newComment = { body };

      if (!tokenn) {
        alert("Please login first");
      } else {
        const loginRes = await axios.post(
          "http://localhost:5000/api/comment/create/" + postId,
          newComment,
          { headers: { "x-auth-token": tokenn } }
        );

        setComment("");
        const commentData = await axios.get(
          "http://localhost:5000/api/post/getComments/" + postId
        );
        // console.log(commentData);
        setComments(commentData.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  return (
    <Card
      className={classes.root}
      style={{ marginLeft: "10%", marginTop: 10, marginBottom: 15 }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.authorName}
          </Avatar>
        }
        action={
          <form>
            <Button color="inherit" onClick={null}>
              Edit
            </Button>
            <Button color="inherit" onClick={null}>
              Delete
            </Button>
          </form>
        }
        title={post.title}
        subheader={"Posted by " + post.authorName + " in " + post.forumName}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ArrowUpwardIcon />
        </IconButton>
        <p>{post.upvotes}</p>
        <IconButton aria-label="share">
          <ArrowDownwardIcon />
        </IconButton>
        <p>{post.downvotes}</p>
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
        <p>{comments.length}</p>
      </CardActions>
      <CardContent>
        <Divider style={{ margin: 5 }} />
        <Typography gutterBottom variant="h5" component="h3">
          Comments -
        </Typography>

        <Paper
          onSubmit={handleSubmit}
          component="form"
          className={classes.grap}
        >
          <Input
            required
            name="body"
            className={classes.textField}
            variant="outlined"
            placeholder="Enter a comment"
            value={body}
            onChange={(e) => setComment(e.target.value)}
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

        {comments.map((comment) => (
          <div key={comment._id}>
            <Card style={{ paddingLeft: 6, paddingTop: 5, marginBottom: 5 }}>
              <CardHeader
                action={
                  <Button color="inherit" onClick={null}>
                    Delete
                  </Button>
                }
                title={"Commented by " + comment.authorname}
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {comment.body}
              </Typography>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <ArrowUpwardIcon />
                </IconButton>
                <p>{comment.upvotes}</p>
                <IconButton aria-label="share">
                  <ArrowDownwardIcon />
                </IconButton>
                <p>{comment.downvotes}</p>
              </CardActions>
            </Card>
            <Divider style={{ margin: 5 }} />
          </div>
        ))}
      </CardContent>
      <Loader loading={loading} />
    </Card>
  );
}
