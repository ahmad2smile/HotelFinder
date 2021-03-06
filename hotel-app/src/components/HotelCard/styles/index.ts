import { createUseStyles } from "react-jss";
import { IProps } from "../HotelCard";
import { mobileUpTo720 } from "../../../utils/responsiveHelpers";

const boxShadow =
	"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

export const useStyles = createUseStyles({
	container: {
		minHeight: 120,
		padding: 10,
		transition: "transform .2s",
		borderTop: "1px solid rgba(0, 0, 0, 0.2)",
		borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
		zIndex: ({ isActive }: IProps) => (isActive ? 10 : 0),
		boxShadow: ({ isActive }: IProps) => (isActive ? boxShadow : "none"),
		transform: ({ isActive }: IProps) =>
			isActive ? "scale(1.05)" : "scale(1)",
		backgroundColor: "#fff",
		"&:hover": {
			border: ({ extended }: IProps) => (extended ? "" : "none"),
			zIndex: 10,
			transform: ({ extended }: IProps) =>
				extended ? "none" : "scale(1.05)",
			boxShadow: ({ extended }: IProps) => (extended ? "none" : boxShadow)
		}
	},
	header: {
		display: "flex",
		margin: "10px 0"
	},
	icon: {
		width: 55
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
	},
	details: {
		display: "block",
		width: "100%",
		textAlign: "right"
	},
	address: {},
	...mobileUpTo720({
		container: {
			"&:hover": {
				borderTop: "1px solid rgba(0, 0, 0, 0.2)",
				borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
				zIndex: 10,
				transform: "none",
				boxShadow: "none"
			}
		},
		address: {
			width: "100%",
			display: "block",
			"& > p": {
				display: "inline"
			}
		}
	})
});
