#include <Arduino.h>
#include <TelnetStream.h>

#include "mqtt_actions.h"       //  Prototypes of functions whose code are here
#include "hw_actions.h"         //  Prototypes of functions called from here

extern int board;

void
toggle_led( int origin, char *msg )
{
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    toggle_led();
}

void 
new_session(int origin, char *msg) {
    TelnetStream.printf("%02d -> %02d |  %s: msg -> %s\n", origin, board, __FUNCTION__, msg );
    Serial.println("New session");
}