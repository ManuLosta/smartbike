#include <Arduino.h>
#include <ArduinoJson.h>

#include "mqtt_actions.h"       //  Prototypes of functions whose code are here
#include "globals.h"            //  Access to global variables
#include "mqtt.h"

void 
new_session(int origin, char *msg) {
    Serial.println("New session");
    HAS_SESSION = true;
}

void
stop_session(int origin, char *msg) {
    Serial.println("Stop session");
    HAS_SESSION = false;
}

void
publish_data(Data data) {
    char speedStr[20];
    char locLonStr[20];
    char locLatStr[20];
    char disStr[20];
    char altStr[20];
    char p_altStr[20];
    char calStr[20];

    snprintf(speedStr, sizeof(speedStr), "%.2f", data.speed);
    snprintf(locLonStr, sizeof(locLonStr), "%.6f", data.loc_lng);
    snprintf(locLatStr, sizeof(locLatStr), "%.6f", data.loc_lat);
    snprintf(disStr, sizeof(disStr), "%.2f", data.distance);
    snprintf(altStr, sizeof(altStr), "%.2f", data.alt);
    snprintf(p_altStr, sizeof(p_altStr), "%.2f", data.p_altitude);
    snprintf(calStr, sizeof(calStr), "%.2f", data.calories);

    JsonDocument jsonData;
    jsonData["speed"] = speedStr;
    jsonData["loc"]["lat"] = locLatStr;
    jsonData["loc"]["lng"] = locLonStr;
    jsonData["distance"] = disStr;
    jsonData["p_altitude"] = p_altStr;
    jsonData["calories"] = calStr;

    String output;
    serializeJson(jsonData, output);
    do_publish("data/live", output.c_str());
}