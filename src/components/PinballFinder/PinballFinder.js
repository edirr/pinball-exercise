import { useState, useEffect } from "react";
import './PinballFinder.css';

function PinballFinder() {

    const [detectedCoords, setDetectedCoords] = useState({})
    const [inputCoords, setInputCoords] = useState({
        latitude: '',
        longitude: '',
    });
    const [pinballLocations, setPinballLocations] = useState([])

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
            .then(res => setPinballLocations(res))
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

    console.log(pinballLocations)
    return (
        <div className="pinball">
            <h1>PinballFinder</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Latitude:
                    <input type="number" name="latitude" value={inputCoords.latitude} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Longitude:
                    <input type="number" name="longitude" value={inputCoords.longitude} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" value="Search" />
                <button onClick={useCurrentLocation}>Near Me</button>
            </form>
        </div>
    );
}

export default PinballFinder;
