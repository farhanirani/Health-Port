import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import axios from "axios";
import UserContext from "./context/UserContext";
import Test from "./components/Test";
import Forum from "./components/ForumPage";
import NavBar from "./Widget/NavBar";
import SubForum from "./components/SubForumPage";
import Home from "./components/HomePage";
import Post from "./components/ViewPost";
import NewPost from "./components/NewPost";
import Approve from "./components/DoctorApprove";
import Message from "./components/Messages";
import Chat from "./components/Chat";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/api/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await axios.get("/api/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/forum" component={Forum} />
          <Route path="/subforum" component={SubForum} />
          <Route path="/post" component={Post} />
          <Route path="/newpost" component={NewPost} />
          <Route exact path="/approve" component={Approve} />
          <Route exact path="/messages" component={Message} />
          <Route exact path="/chatbot" component={Chatbot} />
          <Route path="/messages/chat" component={Chat} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
