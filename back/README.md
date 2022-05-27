# Server description

The server is the manager of all the devices and interactions.
In order to update our infrastruture, we send data every seconds to the differents sensors.

## Installation

To install the server, you first need to run the **npm install** command.
Once, this command is finished, you need to run the **npm start** command.

These commands will start the server and allow you to connect with it.

## Communication

We use CoAP as a way to communicate between all the elements of our architecture.

## Devices description

We had to implement some rules specific to the sensors types.
All theses rules will be explained in each section.

### Fluid Sensors

The fluid we decided to choose is Water.
This sensor realy data about the fluid's consumption and fluid's quantity available.

#### Fluid Sensors Rules

As a user, you will be able to:
   - Change the fluid type
   - Change the fluid quantity in L
   - Change the consumption in mL

### Light Sensors

The light sensor is inspired of the light.
We can switch on and off the light. It's also possible to choose the light intensity.

#### Light Sensors Rules

It's possible to see the light status and change it. Also, you'll see the light intensity and you'll be able to change it.

### Location Sensors

The location sensors is an indicator to show the differents sensors spots.
These sensors don't have any rules. There are only use to place the different sensors.

### Temperature Sensors

We have 2 different data for the temperature sensors:
   - The Humidity
   - The Temperature

All these data will be displayed on ThingsBoard and in the web application.

#### Temperature Sensors Rules

The temperature's sensors data can be modified. You can send valid and invalid data to them.
Furthermore, an alarm will be triggered for specific temperature.