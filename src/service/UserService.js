import firebase from "firebase";
import FirestoreService from "./FirestoreService";

export default class UserService {
  static listenForUserChanges(callback) {
    const that = this;
    firebase.auth().onAuthStateChanged(userAuth => {
      console.log("authStateChange, user:", userAuth);
      if (userAuth) {
        FirestoreService.once("users", userAuth.uid, (noUserData, userData) => {
          if (noUserData) {
            that.createUser(userAuth, createdUser => {
              return callback(null, createdUser);
            });
          } else {
            that.listenToUser(userAuth.uid, (err, data) => {
              data.id = userAuth.uid;
              callback(null, data);
            });
          }
        });
      } else {
        callback(null, null);
      }
    });
  }

  static listenToUser(uid, callback) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot(
        doc => {
          callback(null, doc.data());
          console.log("Current data: ", doc && doc.data());
        },
        function(err) {
          callback(err);
        }
      );
  }

  static signInUserAnonymously() {
    firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        console.log(error.message);
        console.log("error in signInAnonymously");
      });
  }

  static createUser(user, callback) {
    if (!user || !user.uid) {
      return;
    }
    const userData = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      photoURL: user.photoURL
    };

    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(userData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback(user);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  static login(user, callback) {
    let auth = firebase.auth();
    let db = firebase.database();
    auth.signInWithEmailAndPassword(user.email, user.password).then(
      function(res) {
        callback(null, res);
        db
          .ref("users")
          .child(res.uid)
          .update({
            online: true
          });
      },
      function(err) {
        callback(err);
      }
    );
  }

  static signout(user) {
    let auth = firebase.auth();
    // user.online = false;
    // this.updateFields(user, ["online"]);
    auth.signOut();
  }

  static monitorOnlineStatus(user) {
    if (!user || !user.id) {
      return;
    }
    var amOnline = firebase.database().ref("/.info/connected");
    var userRef = firebase.database().ref("/users/" + user.id + "/online");
    amOnline.on("value", snapshot => {
      if (snapshot.val()) {
        userRef.onDisconnect().set(false);
        userRef.set(true);
      }
    });
    userRef.on("value", snapshot => {
      window.setTimeout(() => {
        userRef.set(true);
      }, 2000);
    });
  }

  static resetPassword(email) {
    let auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(
      function() {
        console.log("Password reset sent");
      },
      function(error) {
        //An error happened
        console.log(error);
      }
    );
  }

  static updateEmail(email, user) {
    const that = this;
    let auth = firebase.auth().currentUser;
    auth.updateEmail(email).then(
      function() {
        user.email = email;
        that.updateUser(user);
        console.log("Changed");
      },
      function(error) {
        console.log(error);
      }
    );
  }
}
