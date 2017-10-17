import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";
import registerServiceWorker from "./helpers/registerServiceWorker";
import './assets/styles/App.css';

import TodoList from "./components/TodoList";
import stores from "./models/index";

render(
  <div>
    <DevTools />
    <TodoList {...stores} />
  </div>,
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
