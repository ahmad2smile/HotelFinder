import React from "react";

import { useStyles } from "./styles/";

interface IProps {
	mobile: JSX.Element;
	desktop: JSX.Element;
}

const ResponsiveComponent = ({ mobile, desktop }: IProps) => {
	const classes = useStyles();

	return (
		<>
			<div className={classes.mobile}>{mobile}</div>
			<div className={classes.desktop}>{desktop}</div>
		</>
	);
};

export default ResponsiveComponent;
