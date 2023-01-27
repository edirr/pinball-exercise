import React from 'react';
import './LocationCard.css';

const LocationCard = ({ pinballLocation }) => {
    if (pinballLocation.errors) {
        return (
            <div className="location-card">
                <h2>{pinballLocation.errors}</h2>
                <img src="https://i.pinimg.com/originals/34/c6/bd/34c6bdf25c3ab8cd70d01f6d0eceed9b.gif" alt="Shrug" width="30%" height="30%"></img>
            </div>
        );
    } else {
        const { full_name, state, motd, distance } = pinballLocation.region
        return (
            <div className="location-card">
                <h2>{full_name}, {state}</h2>
                <p className="motto">{motd}</p>
                <p>Distance from: {distance}</p>
            </div>
        );
    }
}

export default LocationCard;
