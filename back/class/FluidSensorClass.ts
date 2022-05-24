import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class FluidSensorClass extends SensorClass {
  readonly host: string | undefined
  readonly path: string
  telemetry: {available: number, consumption: number} = { available: 9, consumption: 10 }
  attributes: {fluidType: string} = {fluidType: "Water"}

  constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
    super(info, roomSocket)
    this.host = host
    this.path = path
    super.changeInterval(this.info.timeBetweenSendData)
  }

  randomTelemetry(telemetry: {available: number, consumption: number}): void {
    let chance = Math.floor(Math.random() * 101);

    if (chance >= 100 - 1) {
      telemetry.available += Math.floor((Math.random() * 3) + 1);
    }
    if (chance >= 100 - 50) {
      telemetry.consumption = Math.floor((Math.random() * 10) + 1);
    }

    telemetry.available -= telemetry.consumption / 1000
    if (telemetry.available <= 0) {
      telemetry.consumption = 0
      telemetry.available = 0
    }
  }

  methodSendTelemetry(telemetry: { available: number, consumption: number }): Promise<any> {
    let toSend: any = {}

    if (telemetry.available <= 0) {
      telemetry.consumption = 0
      telemetry.available = 0
    }
    toSend.available = telemetry.available.toPrecision(4)
    toSend.consumption = telemetry.consumption
    return sendRequestCoAP(this.host, this.path + this.info.token + '/telemetry', toSend)
  }

  methodSendAttributes(attributes: {fluidType: string}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/attributes', attributes)
  }
}