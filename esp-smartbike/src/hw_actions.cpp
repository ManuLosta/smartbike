/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *  hw_actions.cpp
 *      Low level actions in output hardware
 */

#include <Arduino.h>
#include "hw_actions.h"

void
toggle_led(void)
{
    digitalWrite(LED_RED, !digitalRead( LED_RED ));
}