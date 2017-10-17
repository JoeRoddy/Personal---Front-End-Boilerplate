import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Todo from "./Todo";

@observer(['todoStore'])
export default class TodoList extends Component {
  @observable newTodoTitle = "";

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {this.props.todoStore.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoStore.unfinishedTodoCount}
      </div>
    );
  }

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    this.props.todoStore.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
    e.preventDefault();
  };
}