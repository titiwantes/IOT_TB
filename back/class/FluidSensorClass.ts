import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class FluidSensorClass extends SensorClass {
  readonly host: string | undefined
  readonly path: string
  telemetry: {available: number, consumption: number} = { available: 100, consumption: 100 }
  attributes: {fluidType: string} = {fluidType: "Water"}

  constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
    super(info, roomSocket)
    this.host = host
    this.path = path
    super.changeInterval(this.info.timeBetweenSendData)
  }

  randomTelemetry(telemetry: {available: number, consumption: number}): void {
    if (telemetry.available > 0) {
      if (telemetry.available - (telemetry.consumption *0.001) < 0) {telemetry.available = 0} 
      else {telemetry.available  -= telemetry.consumption * 0.001}

      let chance = Math.random()*101
      
      if (chance > 95) {
        let chance = Math.random()*50
        if (telemetry.available + chance >= 100){telemetry.available = 100} 
        else {telemetry.available += chance}
      }
    } else {
      let chance = Math.random()*101
      if (chance > 70){telemetry.available += 100}
    }
  }

  methodSendTelemetry(telemetry: { available: number, consumption: number }): Promise<any> {
    let toSend: any = {}

    toSend.available = telemetry.available.toPrecision(4)
    toSend.consumption = telemetry.consumption
    return sendRequestCoAP(this.host, this.path + this.info.token + '/telemetry', toSend)
  }

  methodSendAttributes(attributes: {fluidType: string}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/attributes', attributes)
  }
}