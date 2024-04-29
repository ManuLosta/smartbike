/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *  hw.cpp
 *      Hardware dependent code
 */

#include <Arduino.h>

#include "hw.h"

/*
 *  init_hw
 *      Called at power up
 */

void
init_hw(void)
{
    pinMode(LED_RED, OUTPUT);
}