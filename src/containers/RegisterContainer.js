import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as userRepository from '../domain/UserRepository';
import Register from '../components/Register';

const registerFields = {name: 0, email: 1, password: 2, };

class RegisterContainer extends Component {

  constructor(props) {
    super(props);

		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
		this.createUserSuccess = this.createUserSuccess.bind(this);
		this.handleUpdateUserName = this.handleUpdateUserName.bind(this);
		this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
		this.handleUpdatePassword = this.handleUpdatePassword.bind(this);

		this.state = { 'users': {}, }
	}

	// NOTE: componentDidMount is used to initialize a component with server-side info
	// fore more info, see react docs: https://facebook.github.io/react/docs/component-specs.html
	componentDidMount() {
		this.databaseReference = userRepository.sync('users', this, 'users');
	}

	componentWillUnmount() {
		userRepository.removeBinding(this.databaseReference);
	}

  handleRegisterSubmit(event) {
    event.preventDefault();

    let user = {
      userName: event.target[registerFields.name].value,
      email: event.target[registerFields.email].value,
    };
		let password = event.target[registerFields.password].value;

		userRepository.createUser(user.email, password, this.createUserSuccess.bind(null, user));
  }

	createUserSuccess(user, err, authData) {
		if (err) {
			alert(err.message);
			return;
		}

		user.owner = authData.uid;

		user.currentCalendarId = 0;
		user.calendars = [{name: 'main', }] ;

		let users = this.state.users;
		users[user.owner] = user;

    this.setState({ users : users});

    this.props.onAuthorize(user);

    this.context.router.push('/');
	}

	handleUpdateUserName(event) {
    this.setState({ inputUserName: [event.target.value] })
	}

	handleUpdateEmail(event) {
    this.setState({ inputEmail: [event.target.value] })
	}

	handleUpdatePassword(event) {
    this.setState({ inputPassword: [event.target.value] })
	}

  render() {
    return (
      <Register
        onSubmit={this.handleRegisterSubmit}
        onUpdateUserName={this.handleUpdateUserName}
        onUpdateEmail={this.handleUpdateEmail}
        onUpdatePassword={this.handleUpdatePassword}
      />
    )
  }
}

// NOTE: contextTypes doesn't scale well, but ok for limited use such as with routers
RegisterContainer.contextTypes = {
	router: PropTypes.object
}

export default RegisterContainer;
