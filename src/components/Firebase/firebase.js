import app from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../../helpers/apiKeys';

class Firebase {
  constructor() {
    app.initializeApp(apiKeys.firebaseConfig);

    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
