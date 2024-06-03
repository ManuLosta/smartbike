#include <Arduino.h>
#include "hw.h"

// Button states for each button
static int nextButtonState;
static int prevButtonState;

static int lastNextButtonState = HIGH;
static int lastPrevButtonState = HIGH;

static unsigned long lastNextDebounceTime = 0;
static unsigned long lastPrevDebounceTime = 0;

static unsigned long debounceDelay = 50;

static int verify_push(int pin, int &buttonState, int &lastButtonState, unsigned long &lastDebounceTime);

void init_hw(void)
{
    pinMode(PUSH_NEXT, INPUT);
    pinMode(PUSH_PREV, INPUT);
}

int verify_hw(int pin)
{
    if (pin == PUSH_NEXT)
    {
        return verify_push(pin, nextButtonState, lastNextButtonState, lastNextDebounceTime);
    }
    else if (pin == PUSH_PREV)
    {
        return verify_push(pin, prevButtonState, lastPrevButtonState, lastPrevDebounceTime);
    }
    return 0;
}

static int verify_push(int pin, int &buttonState, int &lastButtonState, unsigned long &lastDebounceTime)
{
    int reading = digitalRead(pin);
    int result = 0;

    if (reading != lastButtonState)
    {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay)
    {
        if (reading != buttonState)
        {
            buttonState = reading;
            if (buttonState == LOW)
            {
                result = BUTTON;
            }
        }
    }

    lastButtonState = reading;
    return result;
}
