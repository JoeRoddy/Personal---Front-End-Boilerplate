import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, withRouter } from "mobx-react";
import { Switch, Route, Link } from "react-router-dom";

import UserService from "../service/UserService";
import Routes from "./Routes";

@observer(["dataStore", "todoStore"])
export default class App extends Component {
  state = {};

  render() {
    let user = this.props.dataStore.user;
    let screenName = user ? user.id : "none";

    return (
      <div>
        <div className="header">
          <span>Header</span>
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          <div>User: {screenName}</div>
          {user && <a onClick={e => UserService.signout(user)}>Logout</a>}
        </div>
        <Routes {...this.props} />
      </div>
    );
  }
}
