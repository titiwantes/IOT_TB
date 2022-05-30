import React, {useState, useContext, useCallback, useEffect} from 'react';
import Slider from '@mui/material/Slider';
import OpacityIcon from '@mui/icons-material/Opacity';

import './fluidSensor.css'


function FluidSensor({socket, token, name}){

    const [data, setData] = useState("null");
    const [fluid, setFluid] = useState("water");
    const [consumption, setConsumption] = useState(0);
    const [total, setTotal] = useState(100);
    const [input, setInput] = useState('')
    const [quantity, setQuantity] = useState(0)



  useEffect(() => {
    socket.on('newTelemetry', (id ,tok ,data) => {
      if (tok === token){
        setQuantity(data.available)
      }
    })

    socket.on('newAttributes', (id, attributes, token) => {
      console.log(id, attributes, token)
    })
  }, [])
  
  function handleConsumption(event, c) {
    setConsumption(c)
    socket.emit('changeTelemetryToken', token, {available: quantity, consumption: consumption})
  }

  function handleQuantity(event,t){
    setQuantity(t)
    socket.emit('changeTelemetryToken', token, {available: quantity, consumption: consumption})
  }

  function handleType(e) {
    setInput(e.target.value)
  }

  function sendInput() {
    console.log(input)
    setFluid(input)
    setInput('')
    socket.emit('changeAttributesToken',token,{fluidType: fluid} )
  }
    return (
        <div className="fluidsensor" >
          <div className="iconDiv">
            <OpacityIcon className='waterIcon'/>
            <h2 className="title">{name}</h2>
          </div>
          <span className="token">token: {token}</span>
          <span className="quantity">Quantity {quantity} L</span>
          <span className="fluidType">Fluid type : {fluid}</span>
          <span className="total">Total : {total} L</span>
          <span className="consumption">Consumption : {consumption} ml/m</span>
          <div className='fluidInput'><input type="text" value={input} onChange={handleType} /> <button onClick={sendInput}>send</button></div>
          
          <div className="sliderDiv">
          <span>Total</span>
            <Slider 
                className='slider'
                min={0}
                max={100}              
                value={quantity}
                onChange={handleQuantity}
                defaultValue={50}
              />
          </div>

          <div className="sliderDiv">
            <span>Consumption</span>
            <Slider 
                className='slide'
                min={0}
                max={1000}              
                value={consumption}
                onChange={handleConsumption}
                defaultValue={50}
              />
          </div>
          
                    
        </div>
    )
}

export default FluidSensor;