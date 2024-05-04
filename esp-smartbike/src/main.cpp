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
#include "hw.h"
#include "globals.h"

Data data;

void
setup(void)
{
    Serial.begin(BAUD);
    Serial2.begin(9600);

    init_display(); 
    connect_wifi();
    init_hw();
    init_mqtt();
}

void
loop(void)
{
  test_mqtt();      
  if (HAS_SESSION) {
    while (Serial2.available() > 0)
    if (gps.encode(Serial2.read()))
    {
      display_data(data);
    }

  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
  } else {
    display_no_session();
  }                   
}

