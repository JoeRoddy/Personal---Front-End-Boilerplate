import React from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import {withRouter} from 'react-router';

import Login from "./Login";
import TodoList from "./TodoList";

const Routes = observer(({ todoStore }) => {
  debugger;
  let todoWrapper = () => <TodoList todoStore={todoStore} />;
  todoWrapper = withRouter(todoWrapper);
  let loginWrapper = withRouter(Login); 

  return (
    <Switch>
      <Route exact path="/" component={todoWrapper} />
      <Route path="/login" component={loginWrapper} />
    </Switch>
  );
});

export default Routes;
