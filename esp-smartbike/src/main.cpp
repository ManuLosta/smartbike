#include <Arduino.h>
#include <TinyGPSPlus.h>
#include <Wire.h>
#include <Adafruit_SH110X.h>
#include <TinyGPSPlus.h>

TinyGPSPlus gps;

#include "defines.h"
#include "display.h"
#include "wifi_ruts.h"
#include "mqtt.h"
#include "globals.h"
#include "mqtt_actions.h"

Data data;

unsigned long lastPublishTime = 0; // Variable to store the last publish time
const unsigned long publishInterval = 5000; // Interval in milliseconds (5 seconds)

void
setup(void)
{
    Serial.begin(BAUD);
    Serial2.begin(9600);  

    init_display(); 
    connect_wifi();
    init_mqtt();
}

void
loop(void)
{
  test_mqtt();      
  unsigned long currentMillis = millis();
  while (Serial2.available() > 0)
  if (gps.encode(Serial2.read())) {

    if (data.satelites > 3) {
      data.loc_lat = gps.location.lat();
      data.loc_lng = gps.location.lng();
      data.speed = gps.speed.kmph();
      data.alt = gps.altitude.meters();
      data.satelites = gps.satellites.value();
      data.distance += data.speed * (1 / 3600);

      double new_altitude = gps.altitude.meters();
      if (data.alt < new_altitude) {
        data.p_altitude += (new_altitude - data.alt);
      }
      data.alt = new_altitude;

      if (HAS_SESSION) {
        display_data(data);
        if (currentMillis - lastPublishTime >= publishInterval) {
            publish_data(data);
            lastPublishTime = currentMillis; // Update last publish time
        }
      } else { 
        display_no_session(); 
      }
    } else {
        display_no_signal();
    }
  }
  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
}

