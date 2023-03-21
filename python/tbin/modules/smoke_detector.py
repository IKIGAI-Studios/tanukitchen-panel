import RPi.GPIO as GPIO
import time

from .module import Module

class SmokeDetector(Module):

    def __init__(self, id, serial):
        super().__init__(id, serial)
    
    def readValue(self):
        if self.active:
            self.getValueFromArduino('MQ2PER100')
        else:
            self.value = 0

        self.insertValue("values", self.value)
    
    def turnOff(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        GPIO.output(self.pin, GPIO.HIGH)

        super().turnOff()
    
    def turnOn(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        GPIO.output(self.pin, GPIO.LOW)
        super().turnOn()
    