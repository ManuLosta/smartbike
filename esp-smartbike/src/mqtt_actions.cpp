#include <Arduino.h>

#include "mqtt_actions.h"       //  Prototypes of functions whose code are here
#include "hw_actions.h"         //  Prototypes of functions called from here

extern int board;

void
toggle_led( int origin, char *msg )
{
    toggle_led();
}

void 
new_session(int origin, char *msg) {
    Serial.println("New session");
}