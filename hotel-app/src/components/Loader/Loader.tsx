import React from "react";

import { useStyles } from "./styles/";

const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.barsContainer}>
				<div className={classes.defaultRect} />
				<div className={classes.rect2} />
				<div className={classes.rect3} />
				<div className={classes.rect4} />
				<div className={classes.rect5} />
			</div>
		</div>
	);
};
export default Loader;
