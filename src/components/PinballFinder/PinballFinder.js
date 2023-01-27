import { useState, useEffect } from "react";
import './PinballFinder.css';
import LocationCard from '../LocationCard/LocationCard'

function PinballFinder() {

    const [detectedCoords, setDetectedCoords] = useState({})
    const [inputCoords, setInputCoords] = useState({
        latitude: '',
        longitude: ''
    });
    const [pinballLocation, setPinballLocation] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setDetectedCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
    }, []);

    const findPinballLocations = (coords) => {
        fetch(`https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=${coords.latitude}&lon=${coords.longitude}`)
            .then(res => res.json())
            .then(res => setPinballLocation(res))
    }

    const handleChange = (event) => {
        setInputCoords({
            ...inputCoords,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        findPinballLocations(inputCoords)
    };

    const useCurrentLocation = () => {
        setInputCoords(detectedCoords)
        findPinballLocations(detectedCoords)
    }

    return (
        <div className="pinball">
            <h1 className="arcadeHeader">Pinball Finder</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <label>
                    Latitude:
                    <input type="number" name="latitude" required value={inputCoords.latitude} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Longitude:
                    <input type="number" name="longitude" required value={inputCoords.longitude} onChange={handleChange} />
                </label>
                <div className="secondaryBtnsContainer">
                    <button className="secondaryBtn" onClick={() => setInputCoords({ latitude: '', longitude: '' })}>Clear Fields</button>
                    <button className="secondaryBtn" onClick={useCurrentLocation}>Near Me</button>
                </div>
                <input type="submit" value="Search" className="submit" />
            </form>
            {pinballLocation && (
                <>
                    <h1 className="nearestLocations">Nearest Location</h1>
                    <LocationCard pinballLocation={pinballLocation} />
                </>
            )}
        </div>
    );
}

export default PinballFinder;
