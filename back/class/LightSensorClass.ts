const mqtt = require('mqtt')
import { ExitStatus } from "typescript"
import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

export class LightSensor extends SensorClass {
    readonly host: string | undefined
    readonly path: string

    telemetry: {status: boolean, intensity: number} = {status: true, intensity: 50}
    attributes: {status: boolean} = {status: true}
    client: any

    constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
        super(info, roomSocket)
        this.host = host
        this.path = path
        this.client = mqtt.connect('mqtt://localhost', {username: info.token})

        this.client.on('connect', () => {
            this.client.subscribe('v1/devices/me/rpc/request/+')
        })
        
        this.client.on('error', (err: any) => {
            console.log('MQTT connexion error : ',err)
            return
        })

        this.client.on('message', (topic: string, message: any) => {
            let response = JSON.parse(message.toString())

            if (response.method === "setLightValue"){
                if (response.params == false) {
                    this.telemetry = {status: false, intensity: 0}
                } else {
                    this.telemetry = {status: true, intensity: 50}
                }
            }

            if (response.method === "setIntensityValue")this.telemetry = {status: true, intensity: response.params}
        })

        super.changeInterval(this.info.timeBetweenSendData)
    }

    randomTelemetry(telemetry: {available: number, consumption: number}): void {
        this.telemetry = this.telemetry
    }
    

    methodSendTelemetry(telemetry: { available: number, consumption: number }): Promise<any> {
        return this.client.publish('v1/devices/me/telemetry', JSON.stringify(telemetry))
    }
}