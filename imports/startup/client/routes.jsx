import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from '../../ui/App.jsx';
import LandingPage from '../../ui/LandingPage/LandingPage.jsx';
import Main from '../../ui/Main.jsx';

Meteor.startup(() => {
	render(
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={LandingPage} />
				<Route path="/post" component={App} />
			</Route>
		</Router>,
		document.getElementById( 'render-target' )
	);
});

