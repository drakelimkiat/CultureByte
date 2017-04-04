import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

class NavBar extends Component {
	constructor(props) {
			super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (Meteor.user()) {
			console.log("user signed in");
			browserHistory.push('/post');
		}
	}

	render() {
		const hideIfNoUserIsLoggedIn = this.props.currentUser ? '' : 'hide'
		const homePageRoute = this.props.currentUser ? '/post' : '/'

		return (
			<div className="header">
				<ul className="main-navigation">
					<li>
						<IndexLink activeClassName='current' to={homePageRoute}><span className="logo">CultureByte</span></IndexLink>
					</li>
					<li className={hideIfNoUserIsLoggedIn}>
						<Link activeClassName='current' to="/contribution">Your Posts</Link>
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
