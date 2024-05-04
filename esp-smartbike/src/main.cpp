#include <Arduino.h>
#include <TinyGPSPlus.h>
#include <Wire.h>
#include <Adafruit_SH110X.h>
#include <TinyGPSPlus.h>

TinyGPSPlus gps;

#include "wifi_ruts.h"
#include "mqtt.h"
#include "hw.h"

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define i2c_Address 0x3c
#define OLED_RESET -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void
setup(void)
{
    Serial.begin(BAUD);
    Serial2.begin(9600);
  
    display.begin(i2c_Address, true); // Address 0x3C default
    delay(2000);
    display.display();
    display.clearDisplay();
    display.display();

    connect_wifi();
    init_hw();
    init_mqtt();
}

void displayNoData()
{
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 12);
  display.setTextSize(2);
  display.println("Buscando");
  display.println("Satelites");
  display.display();
}

void displayInfo()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid()){
    Serial.print(gps.location.lat(), 6);
    Serial.print(F(","));
    Serial.print(gps.location.lng(), 6);
  }
  else
  {
    displayNoData();
  }
}

void
loop(void)
{
  test_mqtt();                           
  while (Serial2.available() > 0)
    if (gps.encode(Serial2.read()))
      displayInfo();
    if (millis() > 5000 && gps.charsProcessed() < 10)
    {
      Serial.println(F("No GPS detected: check wiring."));
      while (true);
    }
}

