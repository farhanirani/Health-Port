import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Input from "@material-ui/core/Input";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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

export default function SignUp() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [selectedValue, setSelectedValue] = React.useState("user");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      history.push("/");
    }
    // setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    // Details of the uploaded file

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <div>
          <Radio
            checked={selectedValue === "user"}
            onChange={handleChange}
            value="user"
            label="User"
            name="radio-button-demo"
            inputProps={{ "aria-label": "User" }}
          />
          User
          <GreenRadio
            checked={selectedValue === "doctor"}
            onChange={handleChange}
            value="doctor"
            label="Certified"
            name="radio-button-demo"
            inputProps={{ "aria-label": "Doctor" }}
          />
          Doctor
        </div>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="uname"
            label="Username"
            name="uname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
          />
          {selectedValue === "doctor" ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Phone number"
                  label="Phone number"
                  pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  type="number"
                  id="Phone number"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  name="Certificate"
                  label="Certificate"
                  type="file"
                  id="file"
                  autoComplete="Certificate"
                />
              </Grid>
            </Grid>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link
            onClick={() => {
              history.push("/login");
            }}
            variant="body2"
          >
            {"Already a user? Sign In"}
          </Link>
        </form>
      </div>
      <Loader loading={loading} />
    </Container>
  );
}
