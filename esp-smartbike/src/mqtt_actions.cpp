#include <Arduino.h>

#include "mqtt_actions.h"       //  Prototypes of functions whose code are here
#include "globals.h"            //  Access to global variables

void 
new_session(int origin, char *msg) {
    Serial.println("New session");
    HAS_SESSION = true;
}