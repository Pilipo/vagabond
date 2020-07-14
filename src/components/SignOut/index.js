import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button className="dropdown-item" type="button" onClick={firebase.doSignOut}>
    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
    Logout
  </button>
);
export default withFirebase(SignOutButton);
