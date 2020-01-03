import { Styles } from "react-jss";

export const mobileUpTo720 = (styles: Styles): Styles => ({
	"@media (max-width: 720px)": {
		...styles
	}
});
