import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './App.css';
import FluidSensor from "./Sensors/FluidSensor/FluidSensor";
import LightSensor from "./Sensors/LightSensor/LightSensor";
import LocationSensor from "./Sensors/LocationSensor/LocationSensor";
import TemperatureSensor from "./Sensors/TempHumiSensor/Temperature";

const socket = io.connect('http://localhost:3001')

function App() {
  const [response, setResponse] = useState(null)
  const [data, setData] = useState("null");


  useEffect(() => {
    socket.on('create', (id,data) => {
      setData({id:id, data:data})
    })
  }, [])
  

  return (

    <div className="App">
      <div className="line">
        <LightSensor socket={socket} token='LightSensor1' name='LightSensor n°1'/>
        <LocationSensor socket={socket} token='LocationSensor1' name='n°1'/>
        <LightSensor socket={socket} token='LightSensor2' name='LightSensor n°2'/>
        <LocationSensor socket={socket} token='LocationSensor2' name='n°2'/>
        <LightSensor socket={socket} token='LightSensor3' name='LightSensor n°3'/>
        <LocationSensor socket={socket} token='LocationSensor3' name='n°3'/>

      </div>

      <div className="line">
        <FluidSensor socket={socket} token='FluidSensor1' name='FluidSensor n°1'/>
        <LocationSensor socket={socket} token='LocationSensor4' name='n°4'/>
        <FluidSensor socket={socket} token='FluidSensor2' name='FluidSensor n°2'/>
        <LocationSensor socket={socket} token='LocationSensor5' name='n°5'/>
        <FluidSensor socket={socket} token='FluidSensor3' name='FluidSensor n°3'/>
        <LocationSensor socket={socket} token='LocationSensor6' name='n°6'/>


      </div>

      <div className="line">
        <TemperatureSensor socket={socket} token='TemperatureSensor1' name='TemperatureSensor n°1'/>
        <LocationSensor socket={socket} token='LocationSensor7' name='n°7'/>
        <TemperatureSensor socket={socket} token='TemperatureSensor2' name='TemperatureSensor n°2'/>
        <LocationSensor socket={socket} token='LocationSensor8' name='n°8'/>
        <TemperatureSensor socket={socket} token='TemperatureSensor3' name='TemperatureSensor n°3'/>
        <LocationSensor socket={socket} token='LocationSensor9' name='n°9'/>


      </div>



    </div>
  );
}

export default App;
