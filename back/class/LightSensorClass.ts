const mqtt = require('mqtt')
import { ExitStatus } from "typescript"
import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class LightSensor extends SensorClass {
    readonly host: string | undefined
    readonly path: string

    telemetry: {status: boolean, intensity: number} = {status: true, intensity: 50}
    client: any

    constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
        super(info, roomSocket)
        this.host = host
        this.path = path
        this.client = mqtt.connect('mqtt://localhost', {username: info.token})
        
        this.client.on('error', (err: any) => {
            console.log('MQTT connexion error : ',err)
            return
        })

        super.changeInterval(this.info.timeBetweenSendData)
    }

    randomTelemetry(telemetry: {available: number, consumption: number}): void {
        this.telemetry = this.telemetry
    }
    

    methodSendTelemetry(telemetry: { available: number, consumption: number }): Promise<any> {
        return this.client.publish('v1/devices/me/telemetry', JSON.stringify(this.telemetry))
    }
}