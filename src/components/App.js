import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SocketProvider from "../sockets/SocketProvider";
import Game from "./Game";
import CreateGame from "./CreateGame";

const serverUrl = "http://localhost:3456";
// const serverUrl = "http://0284309d.ngrok.io";

function App() {
  return (
    <SocketProvider url={serverUrl}>
      <Router>
        <Switch>
          <Route
            exact
            path="/games"
            render={props => <CreateGame {...props} />}
          />
          <Route exact path="/games/:id" component={Game} />
        </Switch>
      </Router>
    </SocketProvider>
  );
}

export default App;
