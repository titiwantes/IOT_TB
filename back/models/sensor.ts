import Joi from "joi"

export enum TypeSensor {
  Temperature,
  Fluid,
  Location,
  Light
}
export interface Sensor {
  id: number,
  name: string,
  token: string,
  random: boolean,
  isActive: boolean,
  type: TypeSensor.Temperature | TypeSensor.Light | TypeSensor.Fluid | TypeSensor.Location
  timeBetweenSendData: number
};

export const schemaSensorBasicCreate = Joi.object({
  name: Joi.string().required(),
  token: Joi.string().required(),
  random: Joi.boolean().required(),
  isActive: Joi.boolean().required(),
  timeBetweenSendData: Joi.number().required(),
  type: Joi.number().valid(0, 1, 2, 3)
}).unknown(true);

export const schemaSensorBasicModify = Joi.object({
  name: Joi.string(),
  token: Joi.string(),
  random: Joi.boolean(),
  isActive: Joi.boolean(),
  timeBetweenSendData: Joi.number()
}).unknown(true);

