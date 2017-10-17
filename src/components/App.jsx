import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, withRouter } from "mobx-react";
import { Switch, Route, Link } from "react-router-dom";

import Routes from './Routes';

@observer(["todoStore"])
export default class App extends Component {
  state = {};

  render() {

    return (
      <div>
        <ul>Header        
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        </ul>
        <Routes {...this.props}/>
      </div>
    );
  }
}
