// Code for the OLED display
#include <display.h>
#include <Wire.h>
#include <Adafruit_SH110X.h>

#define SCREEN_WIDTH 129 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define i2c_Address 0x3c
#define OLED_RESET -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void init_display()
{
    display.begin(i2c_Address, true); // Address 0x3C default
    delay(2000);
    display.display();
    display.clearDisplay();
    display.display();
}

void display_data(Data data)
{
    Serial.println("Displaying data");
    Serial.println(data.loc_lat);
    Serial.println(data.loc_lng);
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 0);
    display.println("Lat: ");
    display.println(data.loc_lat);
    display.println("Lon: ");
    display.println(data.loc_lng);
    display.display();
}

void display_no_session() 
{
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 0);
    display.println("No session");
    display.display();
}