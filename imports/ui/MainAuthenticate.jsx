import React, { Component } from 'react';
import NavBar from './LandingPage/NavBar.jsx';
import { browserHistory } from 'react-router';

export default class MainAuthenticate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: Meteor.userId() !== null,
		};
	}

	componentWillMount() {
		// Check that the user is logged in before the component mounts
		if (!this.state.isAuthenticated) {
			browserHistory.push('/home');
		}
	}

  componentDidUpdate(prevProps, prevState) {
		// Navigate to a sign in page if the user isn't authenticated when data changes
		if (!this.state.isAuthenticated) {
			browserHistory.push('/home');
		}
	}

	render() {
		return (
			<div>
				<NavBar pathname={this.props.location.pathname} />
				{this.props.children}
			</div>
		);
	}
}
