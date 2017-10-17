import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
export default class ClassComponent extends Component {
  state = {};

  render() {
    return <div>Classy</div>;
  }
}
