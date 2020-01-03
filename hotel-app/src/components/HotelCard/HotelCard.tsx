import React from "react";
import { Hotel } from "shared";

import CallIcon from "../Icons/CallIcon";
import WebsiteIcon from "../Icons/WebsiteIcon";

import { persistHotel } from "../../services/persistanceService";

import { useStyles } from "./styles";
import { Link } from "react-router-dom";

export interface IProps {
	hotel?: Hotel;
	extended?: Boolean;
	isActive?: Boolean;
	onClick?: (hotel: Hotel) => any;
}

const HotelCard = (props: IProps) => {
	const { hotel = {} as Hotel, extended, onClick } = props;
	const classes = useStyles(props);

	const handleClick = () => {
		onClick && onClick(hotel);

		persistHotel(hotel);
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
			{extended && (
				<div className={classes.address}>
					<p>
						Address:{" "}
						<p
							dangerouslySetInnerHTML={{
								__html: hotel.address?.text
							}}
						></p>
					</p>
				</div>
			)}
			{!extended && (
				<Link to={`/hotel/?id=${hotel.id}`} className={classes.details}>
					details>
				</Link>
			)}
		</div>
	);
};

export default HotelCard;
