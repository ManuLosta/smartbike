#include <Arduino.h>

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

    snprintf(speedStr, sizeof(speedStr), "%.2f", data.speed);
    snprintf(locLonStr, sizeof(locLonStr), "%.6f", data.loc_lng);
    snprintf(locLatStr, sizeof(locLatStr), "%.6f", data.loc_lat);
    snprintf(disStr, sizeof(disStr), "%.2f", data.loc_lng);
    snprintf(altStr, sizeof(altStr), "%.2f", data.alt);

    do_publish("data/speed", speedStr);
    do_publish("data/loc_lon", locLonStr);
    do_publish("data/loc_lat", locLatStr);
    do_publish("data/distance", disStr);
    do_publish("data/altitude", altStr);
}