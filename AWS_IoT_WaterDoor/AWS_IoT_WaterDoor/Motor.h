#include <Arduino.h>
#include <Servo.h>

#define Motor_DOWN 0
#define Motor_UP 1

class Motor {
  private:
    int pin;
    byte state;

  public:
    Motor(int pin);
    void init();
    void up();
    void down();
    byte getState();
};
