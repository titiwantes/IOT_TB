import React, {useState, useContext, useCallback, useEffect} from 'react';
import './locationsensor.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';

function LocationSensor({socket, name, token}){
        const [location, setLocation] = useState({latitude: 0, longitude: 0})

        useEffect(() => {
            socket.on('newTelemetry', (id, tok, data) => {
                if (tok == token) {
                    setLocation({latitude: data.latitude, longitude: data.longitude})
                }
            })

        }, [])
        return <div className="locationsensor">
            <div className="divTitle">
                <LocationOnIcon className='icon'/>
                <h2 className="title">{name} </h2>
            </div>
            <span className="lon">Lon: {Math.round(location.longitude * 100)/100}</span>
            <span className="lat">Lat: {Math.round(location.latitude *100)/100}</span>
        </div>
     
}

export default LocationSensor;
