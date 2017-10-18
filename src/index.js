import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import registerServiceWorker from "./helpers/registerServiceWorker";
import "./assets/styles/App.css";
import App from "./components/App";
import stores from "./models/index";
import { Provider } from "mobx-react";
import createBrowserHistory from 'history/createBrowserHistory';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';

const browserHistory = createBrowserHistory();
const AppWrapper = withRouter(App);

render(
  <Provider {...stores}>
    <Router history={browserHistory}>
      <AppWrapper/>
    </Router>
  </Provider>,
  document.getElementById("root")
);

let todoStore = stores.todoStore;
todoStore.addTodo("Get Coffee");
todoStore.addTodo("Write simpler code");
todoStore.todos[0].finished = true;

setTimeout(() => {
  todoStore.addTodo("Get a cookie as well");
}, 2000);

// playing around in the console
window.todoStore = todoStore;
registerServiceWorker();
