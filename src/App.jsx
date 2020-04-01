import React from "react";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import DisplayNews from "./components/DisplayNews";
import DisplayProfile from "./components/DisplayProfile";
import AdminDashboard from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <div className="header">
        <Link to="/">
          <h1 id="header" type="main-header">The Reactive Herald</h1>
        </Link>&nbsp;
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