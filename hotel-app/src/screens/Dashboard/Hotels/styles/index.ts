import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	container: {
		width: "100%",
		height: "100vh",
		overflowY: "scroll",
		overflowX: "hidden"
	},
	list: {
		overflow: "hidden"
	},
	item: {
		width: "100%",
		cursor: "pointer"
	}
});
