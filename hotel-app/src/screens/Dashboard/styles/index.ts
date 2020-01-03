import { createUseStyles } from "react-jss";

import { mobileUpTo720 } from "../../../utils/responsiveHelpers";

export const useStyles = createUseStyles({
	container: {
		display: "flex",
		width: "100%",
		justifyContent: "space-around"
	},
	hotels: {
		width: 360
	},
	map: {
		flexGrow: 1
	},
	...mobileUpTo720({
		hotels: {
			width: "100%"
		},
		map: {
			display: "none"
		}
	})
});
