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
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
  const [doctors, setdoctors] = useState([]);
  const tokenn = localStorage.getItem("auth-token");

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
      const forumdata = await axios.get("/api/docs/getdoctorsforvalidation", {
        headers: { "x-auth-token": tokenn },
      });
      console.log(forumdata.data);
      setdoctors(forumdata.data);
      setLoading(false);
    })();
  }, [loading]);

  const handleReject = async (e) => {
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
            "/api/docs/getdoctorsforvalidation/" + e,
            { accepted: false },
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

  const handleAccept = async (e) => {
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
            "/api/docs/getdoctorsforvalidation/" + e,
            { accepted: true },
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

  if (!loading) {
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
              {doctors.map((doctor) => (
                <Grid item key="hellow" lg={12} style={{ width: "100%" }}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {doctor.firstName.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <form>
                          <Box>
                            <a href="/" color="black">
                              Certificate
                            </a>
                          </Box>
                          <IconButton>
                            <CheckCircleOutlineIcon
                              onClick={() => {
                                handleAccept(doctor._id);
                              }}
                              style={{ fill: "green" }}
                            ></CheckCircleOutlineIcon>
                          </IconButton>
                          <IconButton>
                            <HighlightOffIcon
                              color="inherit"
                              onClick={() => {
                                handleReject(doctor._id);
                              }}
                              style={{ fill: "red" }}
                            ></HighlightOffIcon>
                          </IconButton>
                        </form>
                      }
                      title={
                        doctor.firstName +
                        " " +
                        doctor.lastName +
                        "  (  " +
                        doctor.userName +
                        " )"
                      }
                      subheader={doctor.email}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  } else {
    return <Loader loading={loading} />;
  }
}
