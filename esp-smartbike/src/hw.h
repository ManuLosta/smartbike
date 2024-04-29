
/*
 *  Project 41-mqtt_00 - Austral - EAM
 *
 *  hw.h
 *      Hardware dependent code
 */

enum
{
    NOHW, BUTTON,
    NUM_NEWS
};

void init_hw(void);         //  Called at power up