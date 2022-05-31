import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class LocationSensorClass extends SensorClass {
  readonly host: string | undefined
  readonly path: string
  telemetry: {latitude: number, longitude: number} = { latitude: 48.8498063648816, longitude: 2.357940673828125 }
  attributes: {linkToSensor: string} = {linkToSensor: "None"}

  constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
    super(info, roomSocket)
    this.host = host
    this.path = path
    super.changeInterval(this.info.timeBetweenSendData)
  }

  randomTelemetry(telemetry: {x: number, y: number}): void {
    let chance = Math.floor(Math.random() * 101);
    telemetry = telemetry
  }

  methodSendTelemetry(telemetry: {x: number, y: number}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/telemetry', telemetry)
  }

  methodSendAttributes(attributes: {linkToSensor: string}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/attributes', attributes)
  }
}