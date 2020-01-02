import React from "react";
import { Hotel } from "shared";

import CallIcon from "../../../../components/Icons/CallIcon";

import { useStyles } from "./styles";
import WebsiteIcon from "../../../../components/Icons/WebsiteIcon";

interface IProps {
	hotel: Hotel;
}

const HotelCard = ({ hotel }: IProps) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<img
					src={hotel.icon}
					alt={hotel.title}
					className={classes.icon}
				/>
				<p className={classes.title}>{hotel.title}</p>
			</div>
			{hotel.openingHours && (
				<p
					dangerouslySetInnerHTML={{ __html: hotel.openingHours }}
					className={classes.openingHours}
				></p>
			)}
			<div className={classes.contacts}>
				{hotel.phone && (
					<a
						href={`tel:${hotel.phone}`}
						className={classes.contactsIcon}
					>
						<CallIcon />
					</a>
				)}
				{hotel.website && (
					<a
						href={hotel.website}
						target="_blank"
						rel="noopener noreferrer"
						className={classes.contactsIcon}
					>
						<WebsiteIcon />
					</a>
				)}
			</div>
		</div>
	);
};

export default HotelCard;
