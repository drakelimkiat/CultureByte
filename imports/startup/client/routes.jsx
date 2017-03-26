import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from '../../ui/App.jsx';
import Contribution from '../../ui/Contribution.jsx';
import LandingPage from '../../ui/LandingPage/LandingPage.jsx';
import Main from '../../ui/Main.jsx';

Meteor.startup(() => {
	render(
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={LandingPage} />
				<Route path="/post" component={App} />
				<Route path="/contribution" component={Contribution} />
			</Route>
		</Router>,
		document.getElementById( 'render-target' )
	);
});
