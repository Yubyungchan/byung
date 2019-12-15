#include "Motor.h"
Servo servo;
Motor::Motor(int pin) {
  // Use 'this->' to make the difference between the
  // 'pin' attribute of the class and the 
  // local variable 'pin' created from the parameter.
  this->pin = pin;
  init();
}
void Motor::init() {
  servo.attach(pin);
  // Always try to avoid duplicate code.
  // Instead of writing digitalWrite(pin, LOW) here,
  // call the function off() which already does that
  down();
  state = Motor_DOWN;
}
void Motor::up() {
  servo.write(170);
  state = Motor_UP;
}
void Motor::down() {
  servo.write(10);
  state = Motor_DOWN;
}

byte Motor::getState() {
  return state;
}
