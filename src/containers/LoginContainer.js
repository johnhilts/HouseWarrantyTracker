import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as userRepository from '../domain/UserRepository';
import Login from '../components/Login';

const loginFields = {email: 0, password: 1, }

class LoginContainer extends Component {

  constructor(props) {
    super(props);

		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.authUserSuccess = this.authUserSuccess.bind(this);
		this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
		this.handleUpdatePassword = this.handleUpdatePassword.bind(this);

    this.state = { 'users': {}, 'password': '', }
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    var loginInput = {email: event.target[loginFields.email].value, password: event.target[loginFields.password].value};

    userRepository.authenticateByEmailAndPassword(loginInput.email, loginInput.password,
      this.authUserSuccess.bind(null, loginInput));
  }

  authUserSuccess(loginInput, err, authData) {

    if (err) {
      alert(err.message);
      return;
    }

    this.setState({password: loginInput.password});

    const onFetchSuccess = (user) => {
      if (!user) {
        alert('Login Failed');
        return;
      }
      this.props.onAuthorize(user);

      this.context.router.push('/');
    }

    userRepository.fetchUserInfo(this, authData.uid, onFetchSuccess);
  }

  handleUpdateEmail(event) {
    this.setState({ inputEmail: [event.target.value] })
  }

  handleUpdatePassword(event) {
    this.setState({ inputPassword: [event.target.value] })
  }

  render() {
    return (
      <Login
      onSubmit={this.handleLoginSubmit}
      onUpdateEmail={this.handleUpdateEmail}
      onUpdatePassword={this.handleUpdatePassword}
      />
    )
  }
}

// NOTE: contextTypes doesn't scale well, but ok for limited use such as with routers
LoginContainer.contextTypes = {
	router: PropTypes.object
}

export default LoginContainer;
