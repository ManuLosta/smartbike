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
#include "hw.h"

Data data;

unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50; 

const int BUTTON_PIN_PREV = 36;
const int BUTTON_PIN_NEXT = 39;

int prevButtonState;          
int lastPrevButtonState = LOW;
int nextButtonState;
int lastNextButtonState;

unsigned long lastPublishTime = 0;          // Variable to store the last publish time
const unsigned long publishInterval = 5000; // Interval in milliseconds (5 seconds)

// Variables to calculate average speed and distance
double totalSpeed = 0.0;
int speedCount = 0;
unsigned long lastSpeedTime = 0; // Time when the last speed was read

double speeds[] = {0.0, 13.0, 16.0, 19.0, 22.5, 24.0, 25.5, 27.0, 29.0, 30.55, 32.0, 33.5, 37.0, 40.0};
double coefficient[] = {0.0, 0.00049167, 0.00059167, 0.00071, 0.00085333, 0.000935, 0.001025, 0.001125, 0.00123333, 0.00135167, 0.001485, 0.001625, 0.001955, 0.00235167};

int findClosestIndex(double arr[], int left, int right, int target);

void setup(void)
{
  Serial.begin(BAUD);
  Serial2.begin(9600);

  WEIGHT = 60;

  init_display();
  connect_wifi();
  init_mqtt();

  pinMode(BUTTON_PIN_PREV, INPUT);
  pinMode(BUTTON_PIN_NEXT, INPUT);

  init_hw();

  data.distance = 0.0;
  data.p_altitude = 0.0;
}

void loop(void)
{
  test_mqtt();
  int nextButton = verify_hw(PUSH_NEXT);
  int prevButton = verify_hw(PUSH_PREV);

  if (nextButton == BUTTON)
  {
      Serial.println("Next button pressed");
      SCREEN = 0;
      // Handle next button press
  }

  if (prevButton == BUTTON)
  {
      Serial.println("Previous button pressed");
      SCREEN = 1;
      // Handle previous button press
  }
  unsigned long currentMillis = millis();
  while (Serial2.available() > 0)
  {
    if (gps.encode(Serial2.read()))
    {
      if (gps.satellites.value() >= 0)
      {
        data.loc_lat = gps.location.lat();
        data.loc_lng = gps.location.lng();
        data.speed = gps.speed.kmph();
        data.alt = gps.altitude.meters();
        data.satelites = gps.satellites.value();
        data.calories += coefficient[findClosestIndex(speeds, 0, 13, data.speed)] * WEIGHT;

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

int findClosestIndex(double arr[], int left, int right, int target) {
  // base case: when there is only one element in the array
  if (left == right) {
    return left;
  }

  // calculate the middle index
  int mid = (left + right) / 2;

  // recursively search the left half of the array
  int leftClosest = findClosestIndex(arr, left, mid, target);

  // recursively search the right half of the array
  int rightClosest = findClosestIndex(arr, mid + 1, right, target);

  // compare the absolute differences of the closest elements in the left and right halves
  if (abs(leftClosest - target) <= abs(rightClosest - target)) {
    return leftClosest;
  }
  else {
    return rightClosest;
  }
}
