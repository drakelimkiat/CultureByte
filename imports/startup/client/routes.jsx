import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {analytics} from "meteor/okgrow:analytics";

import App from '../../ui/App.jsx';
import Contribution from '../../ui/Contribution.jsx';
import Index from '../../ui/LandingPage/Index.jsx';
import Main from '../../ui/Main.jsx';
import MainAuthenticate from '../../ui/MainAuthenticate.jsx';
import NotFound from '../../ui/NotFound.jsx';

Meteor.startup(() => {
	render(
		<Router history={browserHistory}>
			<Route path="/home" component={Main}>
				<IndexRoute component={Index} />
			</Route>
			<Route path="/" component={MainAuthenticate}>
				<IndexRoute component={Index} />
				<Route path="/post" component={App} />
				<Route path="/contribution" component={Contribution} />
				<Route path="*" component={NotFound} />
			</Route>
		</Router>,
		document.getElementById('render-target')
	);
});
