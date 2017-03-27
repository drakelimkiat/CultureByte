import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';

class NavBar extends Component {
	constructor(props) {
			super(props);
	}

	render() {
		const currentPath = this.props.currentPath;
		return (
			<div className="header">
				<ul className="main-navigation">
					<li className={currentPath == "/" ? 'current' : ''}>
						<IndexLink to="/">Home</IndexLink>
					</li>
					<li className={this.props.currentUser ? (currentPath == "/contribution" ? 'current' : '') : 'hide'}>
						<Link to="/contribution">Contribution</Link>
					</li>
					<li className={this.props.currentUser ? (currentPath == "/post" ? 'current' : '') : 'hide'}>
						<Link to="/post">Post</Link>
					</li>
					<li id="login-button" className="highlight with-sep">
						<AccountsUIWrapper />
					</li>
				</ul>
			</div>
		);
	}
}

NavBar.propTypes = {
    currentUser: PropTypes.object
};

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, NavBar);
