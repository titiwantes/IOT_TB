import { useState, useEffect } from 'react'
import './temperaturesensor.css'
import ThermostatIcon from '@mui/icons-material/Thermostat';

function TemperatureSensor({socket , name, token}){
    const [data, setData] = useState({temperature: 0, humidity: 0})
    
    useEffect(() => {
        socket.on('newTelemetry', (id ,tok , telemetry) => {
          if (tok === token){
              setData(telemetry)
          }
        })
      }, [])
    
    return <div className="temperaturesensor">
      <div className="divTitle">
        <ThermostatIcon className='icon'/>
        <h2 className="title">{name}</h2>
      </div>
        <span className="temperature">Temperature : {data.temperature} °</span>
        <span className="humidity">Humidity : {data?.humidity} %</span>
    </div>
}

export default TemperatureSensor;