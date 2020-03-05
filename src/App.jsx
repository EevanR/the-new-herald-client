import React from "react";
import { Header, Container } from "semantic-ui-react";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import DisplayNews from "./components/DisplayNews";
import DisplayProfile from "./components/DisplayProfile";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Login />
        <h1 id="header"
          style={{
            fontSize: "55px",
            fontWeight: "normal",
            textAlign: "center",
          }}
          type="main-header"
          as={Link}
          to="/"
        >
          The Reactive Herald
        </h1>
        <Switch>
          <Route exact path="/" component={DisplayNews} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/profile" component={DisplayProfile} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;