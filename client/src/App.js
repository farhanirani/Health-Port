import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/test" component={Test} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
