import React from 'react';

import Body from '../Body';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Body />
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
