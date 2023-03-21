import RPi.GPIO as GPIO
from .module import Module

class Stove(Module):
    
    def __init__(self, id, serial, pin):
        self.pin = pin
        self.TOLERANCE = 2
        # self.heat = False
        super().__init__(id, serial)
    
    def readValue(self):
        if self.active:
            self.getValueFromArduino('TMP36')
        else:
            self.turnOffRes()
            self.value = 0

        self.insertValue("values", self.value)

    def turnOffRes(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        GPIO.output(self.pin, GPIO.HIGH)
    
    def turnOnRes(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        GPIO.output(self.pin, GPIO.LOW)