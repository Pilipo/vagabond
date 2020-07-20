import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import utils from '../../helpers/utils';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
        utils.getPublicIp.then((data) => {
          if (authUser) {
            // eslint-disable-next-line no-param-reassign
            authUser.ip = data.data;
            this.setState({ authUser });
          } else {
            this.setState({ authUser: null });
          }
        });
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />;
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
