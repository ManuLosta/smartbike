#include <Arduino.h>
#include <TinyGPSPlus.h>
#include <Wire.h>
#include <Adafruit_SH110X.h>

TinyGPSPlus gps;

#include "defines.h"
#include "display.h"
#include "wifi_ruts.h"
#include "mqtt.h"
#include "globals.h"
#include "mqtt_actions.h"

Data data;

unsigned long lastPublishTime = 0;          // Variable to store the last publish time
const unsigned long publishInterval = 5000; // Interval in milliseconds (5 seconds)

// Variables to calculate average speed and distance
double totalSpeed = 0.0;
int speedCount = 0;
unsigned long lastSpeedTime = 0; // Time when the last speed was read

void setup(void)
{
  Serial.begin(BAUD);
  Serial2.begin(9600);

  init_display();
  connect_wifi();
  init_mqtt();

  // Initialize distance
  data.distance = 0.0;
}

void loop(void)
{
  test_mqtt();
  unsigned long currentMillis = millis();
  while (Serial2.available() > 0)
  {
    if (gps.encode(Serial2.read()))
    {
      if (gps.satellites.value() > 2)
      {
        data.loc_lat = gps.location.lat();
        data.loc_lng = gps.location.lng();
        data.speed = gps.speed.kmph();
        data.alt = gps.altitude.meters();
        data.satelites = gps.satellites.value();

        unsigned long currentSpeedTime = millis();
        if (lastSpeedTime != 0)
        {
          // Calculate time difference in hours
          double timeDiff = (currentSpeedTime - lastSpeedTime) / 3600000.0;

          // Accumulate distance
          data.distance += data.speed * timeDiff;
        }
        lastSpeedTime = currentSpeedTime;

        // Update total speed and speed count
        totalSpeed += data.speed;
        speedCount++;

        double new_altitude = gps.altitude.meters();
        if (data.alt < new_altitude)
        {
          data.p_altitude += (new_altitude - data.alt);
        }
        data.alt = new_altitude;

        if (HAS_SESSION)
        {
          display_data(data);
          if (currentMillis - lastPublishTime >= publishInterval)
          {
            // Calculate average speed
            double averageSpeed = totalSpeed / speedCount;
            data.speed = averageSpeed;

            // Publish data
            publish_data(data);

            // Update last publish time
            lastPublishTime = currentMillis;

            // Reset total speed and speed count for the next interval
            totalSpeed = 0.0;
            speedCount = 0;
          }
        }
        else
        {
          display_no_session();
        }
      }
      else
      {
        display_no_signal();
      }
    }
  }
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while (true)
      ;
  }
}
