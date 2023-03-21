import RPi.GPIO as GPIO
from .module import Module
import time

from .module import Module

class Extractor(Module):
    
    def __init__(self, id, serial, pin):
        self.pin = pin
        super().__init__(id, serial)
    
    def extract(self):
        print("Extrayendo...")

    def turnOn(self):
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        super().turnOn()
        GPIO.output(self.pin, GPIO.HIGH)
        self.insertValue("actions", "Turned On")
        GPIO.cleanup()

    def turnOff(self):
      
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.OUT)
        super().turnOff()
        GPIO.output(self.pin, GPIO.LOW)
        self.insertValue("actions", "Turned Off")
        GPIO.cleanup()
