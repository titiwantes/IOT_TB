import Joi from "joi"
import { merge } from "lodash"
import { Sensor } from "../models/sensor"

export class SensorClass {
  info: Sensor
  intervale: NodeJS.Timer | undefined

  roomSocket: any

  telemetry: any = {}
  telemetryValidator: Joi.ObjectSchema<any> = Joi.object({}).unknown(true);

  attributes: any = {}
  attributesValidator: Joi.ObjectSchema<any> = Joi.object({}).unknown(true);

  constructor(info: Sensor, roomSocket: any) {
    this.info = info
    this.roomSocket = roomSocket
  }

  changeInterval(time: number) {
    this.info.timeBetweenSendData = time

    if (this.intervale) {
      clearInterval(this.intervale)
      this.intervale = undefined
    }

    if (this.info.timeBetweenSendData > 0 && this.info.isActive) {
      this.intervale = setInterval(() => {
        this.sendTelemetryAuto()
      }, time)
    }
  }

  activate(active: boolean) {
    this.info.isActive = active
    if (active) {
      this.changeInterval(this.info.timeBetweenSendData)
    } else {
      if (this.intervale) {
        clearInterval(this.intervale)
        this.intervale = undefined
      }
    }
  }

  private sendTelemetryAuto() {
    this.sendTelemetry(this.telemetry)
    if (this.info.random) {
      this.randomTelemetry(this.telemetry)
      this.roomSocket.emit("newTelemetry", this.info.id, this.info.token, this.telemetry)
    }
  }

  protected randomTelemetry(telemetry: any) {
  }

  protected methodSendTelemetry(telemetry: any): Promise<any> {
    return new Promise((resolve) => resolve(undefined))
  }

  protected methodSendAttributes(attributes: any): Promise<any> {
    return new Promise((resolve) => resolve(undefined))
  }

  sendTelemetry(telemetry: any) {
    try {
      this.telemetry = telemetry
      this.methodSendTelemetry(telemetry).then((result: any) => {
        this.roomSocket.emit('sendTelemetry', this.info.id, result)
      })
    } catch(e) {
      this.roomSocket.emit('sendTelemetry', this.info.id, {state: 'KO', message: 'No ThingsBoard'})
    }
  }

  sendAttributes(attributes: any) {
    try {
      this.attributes = attributes
      this.methodSendAttributes(attributes).then((result: any) => {
        this.roomSocket.emit('sendAttributes', this.info.id, result)
      })
    } catch(e) {
      this.roomSocket.emit('sendAttributes', this.info.id, {state: 'KO', message: 'No ThingsBoard'})
    }
  }

  getInfoSensors() {
    let toReturn: any = JSON.parse(JSON.stringify(this.info))

    toReturn.telemetry = this.telemetry
    toReturn.attributes = this.attributes
    return toReturn
  }

  changeTelemetry(newTelemetry: any) {
    const { error, value } = this.telemetryValidator.validate(newTelemetry);

    if (!error) {
      this.telemetry = merge(this.telemetry, newTelemetry)
      this.roomSocket.emit("newTelemetry", this.info.id, this.telemetry)
    }
  }

  changeAttributes(newAttributes: any) {
    const { error, value } = this.attributesValidator.validate(newAttributes);

    if (!error) {
      this.attributes = merge(this.attributes, newAttributes)
      this.roomSocket.emit("newAttributes", this.info.id, this.attributes, this.info.token)
      this.sendAttributes(this.attributes)
    }
  }
}