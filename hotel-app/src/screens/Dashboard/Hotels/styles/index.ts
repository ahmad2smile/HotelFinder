import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	container: {
		width: 360,
		height: "100vh",
		overflowY: "scroll",
		overflowX: "hidden"
	},
	list: {
		overflow: "hidden"
	}
});
