#ifndef HW_H
#define HW_H

#define PUSH_NEXT 36
#define PUSH_PREV 39
#define BUTTON 1

void init_hw(void);
int verify_hw(int pin);

#endif // HW_H

void init_hw(void);         //  Called at power up
int verify_hw(int pin);        //  Verifies all input hardware