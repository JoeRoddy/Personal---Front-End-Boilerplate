import { observable } from "mobx";

export default class UserModel {
  localId = Math.random();
  @observable online = false;
  @observable status;
  @observable screenName;

  constructor(user) {
    this.status = user.status;
    this.online = user.online;
    this.screenName = user.screenName;
  }
}
