import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DisplayNews from "./components/DisplayNews";
import DisplayProfile from "./components/DisplayProfile";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <div className="header">
        <h1 id="header" type="main-header">The Reactive Herald</h1>
        <Login />
      </div>
      <Switch>
        <Route exact path="/" component={DisplayNews} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/profile" component={DisplayProfile} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;