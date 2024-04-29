#include <Arduino.h>
#include <TelnetStream.h>

#include "wifi_ruts.h"
#include "mqtt.h"
#include "hw.h"

int board;

void
setup(void)
{
    Serial.begin(BAUD);

    connect_wifi();

    init_hw();
    init_mqtt();
    TelnetStream.begin();
}

void
loop(void)
{
  test_mqtt();                            //  Test news from broker
}