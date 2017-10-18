import { observable, computed, action } from "mobx";
import UserModel from "./UserModel";
import UserService from "../service/UserService";
import FirestoreService from "../service/FirestoreService";

export default class DataStore {
  @observable userId = null;
  @observable users = new Map();
  @observable test = "hi";

  constructor() {
    UserService.listenForUserChanges((err, user) => {
      if (err) {
        return;
      } else if (!user) {
        this.userId = null;
      } else {
        this.userId = user.id;
        this.users.set(user.id, user);
      }

    });
  }

  @computed
  get onlineUsers() {
    let onlineUsers = [];
    this.users.forEach(user => {
      if (user.online) {
        onlineUsers.push(user);
      }
    });
    return onlineUsers;
  }

  @action
  addUser(u) {
    let user = new UserModel(u);
    this.users.set(user.localId, user);
  }

  @computed
  get user() {
    return this.userId ? this.users.get(this.userId) : null;
  }
}
