import RPi.GPIO as GPIO
from .module import Module
import time

from .module import Module

class Extractor(Module):
    
    def __init__(self, id, pin):
        self.pin = pin
        super().__init__(id)
    
    def extract(self):
        print("Extrayendo...")

    def turnOn(self):
        super().turnOn()
        GPIO.output(self.pin, GPIO.HIGH)
        self.insertValue("actions", "Turned On")

    def turnOff(self):
        super().turnOff()
        GPIO.output(self.pin, GPIO.LOW)
        self.insertValue("actions", "Turned Off")