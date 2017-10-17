import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import firebaseui from "firebaseui";
import firebase from "firebase";

@observer
export default class Login extends Component {
  ui = null;

  startLogin = () => {
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>"
    };

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start("#firebase-ui", uiConfig);
  };

  componentDidMount() {
    this.startLogin();
  }

  componentWillUnmount() {
    firebaseui.auth.AuthUI.getInstance().delete();
  }

  render() {
    return <div> Login Screen </div>;
  }
}
