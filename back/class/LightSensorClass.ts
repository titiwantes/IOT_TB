import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class LightSensor extends SensorClass {
    readonly host: string | undefined
    readonly path: string

    luck: boolean = false
    telemetry: {status: boolean, intensity: number} = {status: true, intensity: 50}
    constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
        super(info, roomSocket)
        this.host = host
        this.path = path
        super.changeInterval(this.info.timeBetweenSendData)
    }

    randomTelemetry(telemetry: {available: number, consumption: number}): void {
        this.telemetry = this.telemetry
    }
    

    methodSendTelemetry(telemetry: { available: number, consumption: number }): Promise<any> {
        return sendRequestCoAP(this.host, this.path + this.info.token + '/telemetry', this.telemetry)
      }
}