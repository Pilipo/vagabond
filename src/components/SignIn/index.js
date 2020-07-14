import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <SignInForm />
                  <hr />
                  <div className="text-center">
                    <Link className="small" to={ROUTES.PASSWORD_FORGET}>Profile</Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to={ROUTES.SIGN_UP}>Create an Account!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="exampleInputEmail"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Enter Email Address..."
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="exampleInputPassword"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />

        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox small">
            <input type="checkbox" className="custom-control-input" id="customCheck" />
            <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
          </div>
        </div>
        <button disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">
          Login
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
