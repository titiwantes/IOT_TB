import React, {useState, useContext, useCallback, useEffect} from 'react';
import './lightSensor.css'
import Switch from "react-switch";
import Slider from '@mui/material/Slider';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';


function LightSensor({socket, token, name}){
    const [data, setData] = useState({status: true, intensity: 50})
    const [intensity, setIntensity] = useState(50)
    const [status, setStatus] = useState(true)

    useEffect(() => {
        socket.on('sendTelemetry', (id ,data) => {
          if (id == token){
            setData(data)
            setIntensity(data.intensity)
            setStatus(data.status)
          }
        })
      }, [])

      function handleStatus(status) {
        setStatus(status)
        socket.emit('changeTelemetryToken', token, {status: status, intensity: status ? intensity : 0})

      }
      function changeIntensity(event, newValue) {
        if (typeof newValue === 'number')
        socket.emit('changeTelemetryToken', token, {status: status, intensity: intensity})
          setIntensity(newValue)
      }

      return (
          <div className="lightsensor">
            <div className='titleDiv'>
              <EmojiObjectsIcon className={status ? 'iconOn':'iconOff'}/>
              <h2 className='title'>{name}</h2>
            </div>
            <span className="token">Token: {token}</span>
            <span className="status">Status : {status ? 'ON': 'OFF'}</span>
            <span className="intensity">Intensity : {intensity} %</span>
            <Switch onChange={handleStatus} checked={status}/>
            
            <div className="sliderDiv">
              <span>Intensity</span>
              <Slider 
                className='slider'
                min={0}
                max={100}              
                value={intensity}
                onChange={changeIntensity}
                defaultValue={50}
                disabled={status ? false : true}
              />
            </div>
          </div>
      )

}

export default LightSensor;