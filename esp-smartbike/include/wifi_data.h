#ifndef __WIFI_DATA_H__
#define __WIFI_DATA_H__

/*
 *  Project 01-MQTT-HolaMundo
 *
 *  wifi_data.h
 *      Data configuration for WiFi connection
 */

#if (WIFI==0)                   //  Home settings
    #define MY_SSID "Yaya"
    #define MY_PASS "manu2017"
#elif (WIFI==1)                 //  University settings
    #define MY_SSID "UA-Alumnos"
    #define MY_PASS "41umn05WLC"
#elif (WIFI==2)                 //  Other place settings
    #define MY_SSID "POCOX3"
    #define MY_PASS "manu2003"
#else
    #error  "WIFI symbol out of range"
#endif

//  wifi_data.h ends
#endif

