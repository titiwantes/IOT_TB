# ThingsBoard

## Install ThingsBoard

You need to have Docker CE and Docker Compose install on Linux.

Run this command:

```
mkdir -p ~/.mytb-data && sudo chown -R 799:799 ~/.mytb-data
mkdir -p ~/.mytb-logs && sudo chown -R 799:799 ~/.mytb-logs
```

After that run this command:

```
docker-compose pull
```

## Run ThingsBoard

Run this command:

```
docker-compose up
```

## Connect ThingsBoard

Go to this url to have access to ThingsBoard `http://localhost:8080`.

When you see a login page enter this information

```
user: tenant@thingsboard.org
password: tenant
```

## Import

To import all device profile. You need, in ThingsBoard web site, go to this `http://localhost:8080/deviceProfiles` and click `+` button, select `import device profile`, select one of the json in the folder `import/device profile`. repeat this task for every device profiles.

To import all devices. You need, in ThingsBoard web site, go to this `http://localhost:8080/devices` and click `+` button, select `import device`, select the `import/devices.csv` file and press continue button, click on continue again, in step 3 the least value select access token and press continue.

To import all dashboards. You need, in ThingsBoard web site, go to this `http://localhost:8080/dashboards` and click `+` button, select `import device profile`, select one of the json in the folder `import/dashboard`. repeat this task for every dashboard.

After that all thingsboard is initialize and ready to use.

## Dashboard Description

In ThingsBoard, you'll be able to see 4 different Dashbord.
You'll have a description of each dashboard below.

### Fluid Dashboard

In the Fluid Dashboard, you'll see all the data about the 3 fluid sensors.
You'll be able to see the quantity available and their consumption.

### Humidity Dashboard

The Humidity Dashboard regroups all the humidity sensors.
We separated the humidity and temperature. So, we have dashboard for each of them.

### Temperature Dashboard

This Dashboard shows all the temperature's data.

### Location Dashboard

The Location Dashboard allows you to see all the sensors's locations.