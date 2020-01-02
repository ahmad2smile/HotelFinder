import React from "react";

import { useStyles } from "./styles";

interface IProps {
	onChange: (query: string) => any;
}

const Search = ({ onChange }: IProps) => {
	const classes = useStyles();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className={classes.container}>
			<input
				onChange={handleChange}
				type="text"
				placeholder="Search Hotel"
				className={classes.input}
			/>
		</div>
	);
};

export default Search;
