import { createUseStyles } from "react-jss";
import { mobileUpTo720 } from "../../../utils/responsiveHelpers";

export const useStyles = createUseStyles({
	mobile: {
		display: "none"
	},
	desktop: {
		display: "block"
	},
	...mobileUpTo720({
		mobile: {
			display: "block"
		},
		desktop: {
			display: "none"
		}
	})
});
