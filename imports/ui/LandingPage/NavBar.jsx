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
		const hideIfNoUserIsLoggedIn = this.props.currentUser ? '' : 'hide'
		return (
			<div className="header">
				<ul className="main-navigation">
					<li>
						<IndexLink activeClassName={currentPath == "/" ? 'current' : ''} to="/">Home</IndexLink>
					</li>
					<li className={hideIfNoUserIsLoggedIn}>
						<Link activeClassName={currentPath == "/contribution" ? 'current' : ''} to="/contribution">Contribution</Link>
					</li>
					<li className={hideIfNoUserIsLoggedIn}>
						<Link activeClassName={currentPath == "/post" ? 'current' : ''} to="/post">Post</Link>
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
