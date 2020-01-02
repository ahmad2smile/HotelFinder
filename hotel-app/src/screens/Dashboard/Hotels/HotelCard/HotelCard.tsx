import React from "react";
import { Hotel } from "shared";

import CallIcon from "../../../../components/Icons/CallIcon";

import { useStyles } from "./styles";
import WebsiteIcon from "../../../../components/Icons/WebsiteIcon";

export interface IProps {
	hotel: Hotel;
	isActive: Boolean;
	onClick: (hotel: Hotel) => any;
}

const HotelCard = (props: IProps) => {
	const { hotel, onClick } = props;
	const classes = useStyles(props);

	const handleClick = () => {
		onClick(hotel);
	};

	return (
		<div onClick={handleClick} className={classes.container}>
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
