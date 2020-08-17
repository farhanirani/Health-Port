import React, { useState } from "react";
import axios from "axios";
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
    top: 20,
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
  const [messages, setMessages] = useState([
    {
      text:
        "Hello, I am HealthPortBot, here to help you find out which disease you might have.",
      sender: 1,
    },
    {
      text: "Please can you tell me the problems/symptoms that you are facing.",
      sender: 1,
    },
  ]);

  // *****************
  // *****************

  const submitClick = (e) => {
    e.preventDefault();
    setMessages((prevState) => [...prevState, { text: message, sender: 2 }]);

    axios
      .post(`http://localhost:5000/api/chatbot/send`, {
        MSG: message,
      })
      .then((res) => {
        console.log(res);
        setMessages((prevState) => [
          ...prevState,
          { text: res.data.Reply, sender: 1 },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage("");
  };

  // *****************
  // *****************

  const classes = useStyles();
  const displayMessages = () => {
    return (
      <>
        {messages.map((mes, index) => {
          if (mes.sender === 1) {
            return (
              <div key={index} className={classes.botChatCont}>
                <Paper className={classes.botReply}>{mes.text}</Paper>
              </div>
            );
          } else {
            return (
              <div key={index} className={classes.userChatCont}>
                <Paper className={classes.userReply}>{mes.text}</Paper>
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
    </>
  );
}

export default Datafetching;
