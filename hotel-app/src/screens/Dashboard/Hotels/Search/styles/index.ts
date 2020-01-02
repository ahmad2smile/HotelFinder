import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	container: {
		width: "100%",
		height: 60,
		paddingBottom: 20
	},
	input: {
		height: "100%",
		width: "100%",
		background: "#fff",
		boxShadow: "0 6px 10px 0 rgba(0, 0, 0 , .1)",
		border: 0,
		outline: 0,
		padding: "0 10px",
		fontSize: 16
	}
});
