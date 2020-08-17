import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import Loader from "./Loader";

import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles({
  textFieldCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    position: "fixed",
    bottom: 20,
    width: "85%",
    paddingRight: 5,
    paddingLeft: 5,
  },
  chatCont: {
    bottom: 95,
    width: "100%",
    overflowY: "scroll",
    position: "fixed",
  },
  botChatCont: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
  },
  botReply: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    maxWidth: "60%",
    padding: "10px",
    marginLeft: "15px",
    hyphens: "auto",
  },
  userChatCont: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
  },
  userReply: {
    backgroundColor: "#fff",
    color: "#262626",
    maxWidth: "60%",
    padding: "10px",
    marginRight: "15px",
    marginLeft: "auto",
  },
});

function Datafetching() {
  const [message, setMessage] = useState("");
  const tokenn = localStorage.getItem("auth-token");
  const history = useHistory();
  const otherpersonid = window.location.pathname.substring(15);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  // *****************
  // *****************

  useEffect(() => {
    (async () => {
      const postData = await axios.get(
        `http://localhost:5000/api/messages/` + otherpersonid,
        { headers: { "x-auth-token": tokenn } }
      );
      console.log(otherpersonid);
      console.log(postData.data);
      setMessages(postData.data);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newPost = {
        body: message,
      };
      console.log(newPost);
      if (!tokenn) {
        alert("Please login first");
        setLoading(false);
      } else {
        const temp = await axios.post(
          "http://localhost:5000/api//messages/add/" + otherpersonid,
          newPost,
          { headers: { "x-auth-token": tokenn } }
        );
        setMessage("");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  // *****************
  // *****************

  const classes = useStyles();
  const displayMessages = () => {
    return (
      <>
        {messages.map((mes) => {
          if (mes.senderId === otherpersonid) {
            return (
              <div className={classes.botChatCont}>
                <Paper className={classes.botReply}>{mes.body}</Paper>
              </div>
            );
          } else {
            return (
              <div className={classes.userChatCont}>
                <Paper className={classes.userReply}>{mes.body}</Paper>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <>
      <div className={classes.chatCont}>{displayMessages()}</div>
      <div className={classes.textFieldCenter}>
        <form onSubmit={submitClick} className={classes.textField}>
          <Input
            required
            className={classes.textField}
            variant="outlined"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              ),
            }}
          />
          <input type="submit" hidden />
        </form>
      </div>
      <Loader loading={loading} />
    </>
  );
}

export default Datafetching;
