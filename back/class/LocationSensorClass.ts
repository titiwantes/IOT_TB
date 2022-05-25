import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class LocationSensorClass extends SensorClass {
  readonly host: string | undefined
  readonly path: string
  telemetry: {x: number, y: number} = { x: 48.8498063648816, y: 2.357940673828125 }
  attributes: {linkToSensor: string} = {linkToSensor: "None"}

  constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
    super(info, roomSocket)
    this.host = host
    this.path = path
    super.changeInterval(this.info.timeBetweenSendData)
  }

  randomTelemetry(telemetry: {x: number, y: number}): void {
    let chance = Math.floor(Math.random() * 101);
    telemetry= { x: 2.357940673828125 , y: 8498063648816 }
    return
    if (chance >= 100 - 50) {
      let chanceBack = Math.floor(Math.random() * 2);
      let move = Math.floor((Math.random() * 10) + 3);
      if (chanceBack === 1)
        telemetry.x += move
      else
        telemetry.x -= move
    }

    chance = Math.floor(Math.random() * 101);
    if (chance >= 100 - 50) {
      let chanceBack = Math.floor(Math.random() * 2);
      let move = Math.floor((Math.random() * 10) + 3);

      if (chanceBack === 1)
        telemetry.y += move
      else
        telemetry.y -= move
    }
  }

  methodSendTelemetry(telemetry: {x: number, y: number}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/telemetry', telemetry)
  }

  methodSendAttributes(attributes: {linkToSensor: string}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/attributes', attributes)
  }
}