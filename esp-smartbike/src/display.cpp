// Code for the OLED display
#include <display.h>
#include <Wire.h>
#include <Adafruit_SH110X.h>
#include <globals.h>

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

void display_data0(Data data);
void display_data1(Data data);

void display_data(Data data)
{
    switch (SCREEN)
    {
    case 0:
        display_data0(data);
        break;

    case 1:
        display_data1(data);
        break;
    }
}

void display_no_session()
{
    display.clearDisplay();
    display.setTextSize(2);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 0);
    display.println("NO SESSION");
    display.println("STARTED");
    display.display();
}

void display_no_signal()
{
    display.clearDisplay();
    display.setTextSize(2);
    display.setTextColor(SH110X_WHITE);
    display.setCursor(0, 0);
    display.println("NO SIGNAL");
    display.display();
}

void display_data0(Data data)
{
    display.clearDisplay();
    display.setCursor(8, 10);
    display.setTextSize(3);
    display.print(String(int(data.speed)));
    display.setTextSize(1);
    display.print("km/h");
    display.setTextSize(2);
    display.setCursor(8, 40);
    display.print(String(data.distance));
    display.setTextSize(1);
    display.print("km");
    display.display();
}

void display_data1(Data data)
{
    display.clearDisplay();
    display.setCursor(10, 16);
    display.setTextSize(3);
    display.print(String(int(data.calories)));
    display.setTextSize(1);
    display.print("cal");
    display.display();
}

void display_weight()
{
    display.clearDisplay();
    display.setTextSize(2);
    display.setCursor(0, 0);
    display.println("New");
    display.println("weight: ");
    display.print(String(WEIGHT));
    display.print(" kg");
    display.display();
}