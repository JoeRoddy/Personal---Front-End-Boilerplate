import firebase from 'firebase';
import { API_URL, FIREBASE_CONFIG } from '../config';
import { post } from 'form-urlencoded-post';

export default class UserService {

  static listenForUserChanges(callback) {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log("authStateChange, user:", user)
      if (user) {
        firebase.database().ref("users").child(user.uid).once("value", function (snapshot) {
          let data = snapshot.val();
          if (!data) { callback(null, null); return; }
          data.id = user.uid;
          callback(null, data);
        })
      } else {
        callback(null, null);
      }
    });
  }

  static login(user, callback) {
    let auth = firebase.auth();
    let db = firebase.database();
    auth.signInWithEmailAndPassword(user.email, user.password).then(function (res) {
      callback(null, res);
      db.ref("users").child(res.uid).update({
        online: true
      })
    }, function (err) {
      callback(err);
    })
  }

  static signout(user) {
    let auth = firebase.auth();
    user.online = false;
    this.updateFields(user, ["online"]);
    auth.signOut();
  }

  static monitorOnlineStatus(user) {
    if (!user || !user.id) { return; }
    var amOnline = firebase.database().ref('/.info/connected');
    var userRef = firebase.database().ref("/users/" + user.id + "/online");
    amOnline.on('value', snapshot => {
      if (snapshot.val()) {
        userRef.onDisconnect().set(false);
        userRef.set(true);
      }
    });
    userRef.on('value', snapshot => {
      window.setTimeout(() => {
        userRef.set(true)
      }, 2000);
    });
  }

  static resetPassword(email) {
    let auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function () {
      console.log("Password reset sent");
    }, function (error) {
      //An error happened
      console.log(error)
    });
  }

  static updateUser(user) {
    let db = firebase.database();
    db.ref("users/").child(user.id).update(user);
  }

  static updateEmail(email, user) {
    const that = this;
    let auth = firebase.auth().currentUser;
    auth.updateEmail(email).then(function () {
      user.email = email;
      that.updateUser(user);
      console.log("Changed");
    }, function (error) {
      console.log(error);
    });
  }

}