import firebase from "firebase";
import "firebase/firestore";

import TodoListModel from "./TodoListModel";
import DataStore from "./DataStore";

var config = {

};
firebase.initializeApp(config);

export default {
  dataStore: new DataStore(),
  todoStore: new TodoListModel()
};
