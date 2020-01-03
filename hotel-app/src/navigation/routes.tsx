import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "../screens/Dashboard/Dashboard";

import Loader from "../components/Loader/Loader";
const HotelDetails = React.lazy(() =>
	import("../screens/HotelDetails/HotelDetails")
);

const MainRoute = (): JSX.Element => (
	<Router>
		<React.Suspense fallback={<Loader />}>
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/hotel" component={HotelDetails} />
			</Switch>
		</React.Suspense>
	</Router>
);

export default MainRoute;
