import firebase from "firebase";

export default class FirestoreService {
  static once(collection, docKey, callback) {
    var db = firebase.firestore();
    var docRef = db.collection(collection).doc(docKey);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        const data = doc.data();
        return callback(null, data);
      } else {
        return callback("no such doc");
      }
    });
  }

  static update(collection, docKey, newData) {
    if (!collection || !docKey || !newData) {
      return;
    }
    var db = firebase.firestore();
    var ref = db.collection(collection).doc(docKey);
    ref.set(newData, { merge: true });
  }
}
