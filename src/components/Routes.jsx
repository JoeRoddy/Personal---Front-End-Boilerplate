import React from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import {withRouter} from 'react-router';

import Login from "./Login";
import TodoList from "./TodoList";

const Routes = observer(({ todoStore }) => {
  let todoWrapper = () => <TodoList todoStore={todoStore} />;

  return (
    <Switch>
      <Route exact path="/" component={todoWrapper} />
      <Route path="/login" component={Login} />
    </Switch>
  );
});

export default Routes;
