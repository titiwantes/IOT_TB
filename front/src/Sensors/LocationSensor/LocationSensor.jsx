import React, {useState, useContext, useCallback, useEffect} from 'react';
import './locationsensor.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';

function LocationSensor({socket, name, token}){
        const [location, setLocation] = useState({lat: 0, lon: 0})

        useEffect(() => {
            socket.on('newTelemetry', (id, tok, data) => {
                if (tok == token) {
                    setLocation({lat: data.x, lon: data.y})
                }
            })

        }, [])
        return <div className="locationsensor">
            <div className="divTitle">
                <LocationOnIcon className='icon'/>
                <h2 className="title">{name} </h2>
            </div>
            <span className="lon">Lon: {Math.round(location.lon * 100)/100}</span>
            <span className="lat">Lat: {Math.round(location.lat*100)/100}</span>
        </div>
     
}

export default LocationSensor;
