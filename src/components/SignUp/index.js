import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div className="container">
    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-7">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <SignUpForm />
              <hr/ >
              <div className="text-center">
                    <Link className="small" to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to={ROUTES.SIGN_IN}>Already have an account? Login!</Link>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            id="exampleFirstName"
            className="form-control form-control-user"
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="exampleInputEmail"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group row">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <input
              className="form-control form-control-user"
              id="exampleInputPassword"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="col-sm-6">
            <input
              className="form-control form-control-user"
              id="exampleRepeatPassword"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Repeat Password"
            />
          </div>
        </div>
        <button disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">Register Account</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have and Account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
