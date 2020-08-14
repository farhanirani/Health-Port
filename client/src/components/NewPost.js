import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const [loading] = useState(false);

  const history = useHistory();

  //

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5" component="h2">
          New Post
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Submitting to r/Subreddit
        </Typography>
        <form onSubmit={null} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            required
            fullWidth
            id="Caption"
            label="Caption"
            name="post caption"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            multiline
            required
            rows="9"
            fullWidth
            id="Content"
            label="Content"
            name="post content"
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
