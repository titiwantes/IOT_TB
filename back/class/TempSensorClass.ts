import { Sensor } from "../models/sensor"
import { sendRequestCoAP } from "../src/coap"
import { SensorClass } from "./SensorClass"

const normalRangeTemp = {
  min: -10,
  max: 30
}

const normalRangeHumidity = {
  min: 15,
  max: 50
}


export class TempSensorClass extends SensorClass {
  readonly host: string | undefined
  readonly path: string
  telemetry: { temperature: number, humidity: number } = { temperature: Math.floor((Math.random()*(normalRangeTemp.max - normalRangeTemp.min)) + normalRangeTemp.min),
     humidity: Math.floor((Math.random()*(normalRangeHumidity.max - normalRangeHumidity.min)) + normalRangeHumidity.min)}
  tempValues: {status: boolean, last: number} = {status: true, last: this.telemetry.temperature}
  humiValues: {status: boolean, last: number} = {status: true, last: this.telemetry.humidity}

  constructor(host: string | undefined, path: string, info: Sensor, roomSocket: any) {
    super(info, roomSocket)
    this.host = host
    this.path = path
    super.changeInterval(this.info.timeBetweenSendData)
  }

  randomTelemetry(telemetry: { temperature: number , humidity: number}): void {
    let chance = Math.floor(Math.random() * 101);

    if (chance >= 100 - 10 && this.tempValues.status) {
      this.tempValues.last = telemetry.temperature
      telemetry.temperature = Math.floor((Math.random() * 2 * 999) - 999);
      this.tempValues.status = false
    } else {
        chance = Math.random()*101
        if (chance > 99) {
          chance = Math.random()*101
          if (chance > 50){
            telemetry.temperature = this.tempValues.last + 1;
          } else {
            telemetry.temperature = this.tempValues.last -1;
          }
          this.tempValues.last = telemetry.temperature;
        } else {
          telemetry.temperature = this.tempValues.last;
        }
        this.tempValues.status = true;
    }

    chance = Math.floor(Math.random() * 101);


    if (chance >= 100 - 10 && this.humiValues.status) {
      this.humiValues.last = telemetry.humidity;
      telemetry.humidity = Math.floor((Math.random() * 2 * 999) - 999);
      this.humiValues.status = false
    } else {
      chance = Math.random()*101
        if (chance > 99) {
          chance = Math.random()*101
          if (chance > 50){
            telemetry.humidity = this.humiValues.last + 1
          }else {
            telemetry.humidity = this.humiValues.last - 1
          }
          this.humiValues.last = telemetry.humidity
          } else {
            telemetry.humidity = this.humiValues.last;
          }
          this.humiValues.status = true;
    }
  }

  methodSendTelemetry(telemetry: {x: number, y: number}): Promise<any> {
    return sendRequestCoAP(this.host, this.path + this.info.token + '/telemetry', telemetry)
  }
}