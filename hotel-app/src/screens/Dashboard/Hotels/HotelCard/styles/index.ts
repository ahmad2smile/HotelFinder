import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	container: {
		minHeight: 120,
		padding: 10,
		transition: "transform .2s",
		borderTop: "1px solid rgba(0, 0, 0, 0.2)",
		borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
		zIndex: 0,
		backgroundColor: "#fff",
		"&:hover": {
			border: "none",
			zIndex: 10,
			transform: "scale(1.05)",
			boxShadow:
				"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
		}
	},
	header: {
		display: "flex",
		margin: "10px 0"
	},
	icon: {
		width: 40
	},
	title: {
		fontWeight: 501,
		maxWidth: "80%"
	},
	contacts: {
		display: "flex",
		margin: "0 10px"
	},
	contactsIcon: {
		color: "#222",
		fontSize: 20,
		padding: 10
	},
	openingHours: {
		marginLeft: 10,
		fontSize: 12
	}
});
