import { FluidSensorClass } from './../class/FluidSensorClass';
import { TempSensorClass } from './../class/TempSensorClass';
import { Sensor, TypeSensor } from './../models/sensor';
import { Server, Socket } from "socket.io";
import { LocationSensorClass } from '../class/LocationSensorClass';
import { SensorClass } from '../class/SensorClass';
import { merge } from 'lodash';
import { LightSensor } from '../class/LightSensorClass';

const port = 3001
const io = new Server({ cors: { origin: '*' } });
const host = undefined
const path = "/api/v1/"

const roomSensors = 'Sensors'

let sensorList: SensorClass[] = [
  
  new TempSensorClass(host, path, { id: 1, name: 'Temperature sensor 1', token: 'TemperatureSensor1', type: TypeSensor.Temperature, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 2, name: 'Location sensor 1', token: 'LocationSensor1', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),
  new TempSensorClass(host, path, { id: 3, name: 'Temperature sensor 2', token: 'TemperatureSensor2', type: TypeSensor.Temperature, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 4, name: 'Location sensor 2', token: 'LocationSensor2', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),
  new TempSensorClass(host, path, { id: 5, name: 'Temperature sensor 3', token: 'TemperatureSensor3', type: TypeSensor.Temperature, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 6, name: 'Location sensor 3', token: 'LocationSensor3', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),


  new FluidSensorClass(host, path, { id: 7, name: 'Fluid sensor 1', token: 'FluidSensor1', type: TypeSensor.Fluid, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 8, name: 'Location sensor 4', token: 'LocationSensor4', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),
  new FluidSensorClass(host, path, { id: 9, name: 'Fluid sensor 2', token: 'FluidSensor2', type: TypeSensor.Fluid, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 10, name: 'Location sensor 5', token: 'LocationSensor5', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),
  new FluidSensorClass(host, path, { id: 11, name: 'Fluid sensor 3', token: 'FluidSensor3', type: TypeSensor.Fluid, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 12, name: 'Location sensor 6', token: 'LocationSensor6', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),


  new LightSensor(host, path, { id: 13, name: 'Light sensor 1', token: 'LightSensor1', type: TypeSensor.Fluid, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 14, name: 'Location sensor 7', token: 'LocationSensor7', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),
  new LightSensor(host, path, { id: 15, name: 'Light sensor 2', token: 'LightSensor2', type: TypeSensor.Fluid, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 16, name: 'Location sensor 8', token: 'LocationSensor8', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),
  new LightSensor(host, path, { id: 17, name: 'Light sensor 3', token: 'LightSensor3', type: TypeSensor.Fluid, random: true, isActive: true, timeBetweenSendData: 1000 }, io.to(roomSensors)),
  new LocationSensorClass(host, path, {id: 18, name: 'Location sensor 9', token: 'LocationSensor9', type: TypeSensor.Location, random: true, isActive: true, timeBetweenSendData: 1000}, io.to(roomSensors)),

]

let idCount: number = sensorList.length + 10

function findSensorIndex(id: number): number {
  return sensorList.findIndex((element: SensorClass) => element.info.id === id)
}

function findSensorToken(token: string): number {
  return sensorList.findIndex((element: SensorClass) => element.info.token === token)
}

io.on('connection', async (socket: Socket) => {

  await socket.join(roomSensors)

  socket.on('changeAttributes', (index: number, newAttributes: any) => {
    const indexList = findSensorIndex(index)

    if (indexList !== -1) {
      sensorList[indexList].changeAttributes(newAttributes)
    }
  })

  socket.on('changeAttributesToken', (token: string, attributes:any) =>{
    const index = findSensorToken(token)

    if (index !== -1) {
      sensorList[index].changeAttributes(attributes)
    }
    } 
  )

  socket.on('changeTelemetry', (index: number, newTelemetry: any) => {
    const indexList = findSensorIndex(index)

    if (indexList !== -1) {
      sensorList[indexList].changeTelemetry(newTelemetry)
    }
  })

  socket.on('changeTelemetryToken', (token: string, newTelemetry: any) => {
    const indexList = findSensorToken(token)

    if (indexList !== -1) {
      sensorList[indexList].changeTelemetry(newTelemetry)
    }
  })



  
  socket.on('getSensors', (callback) => {
    if (typeof callback !== "function") {
      return socket.disconnect();
    }

    callback({
      status: "OK",
      payload: sensorList.map((element: SensorClass) => {
        return element.getInfoSensors()
      })
    });
  })

})


io.listen(port);
console.log("Server start on port ",port)