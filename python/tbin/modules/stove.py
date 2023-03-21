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

            # * Lógica de la estufa
            if self.value > self.target+self.TOLERANCE:
                GPIO.output(self.pin, GPIO.LOW)
            elif self.value < self.target-self.TOLERANCE:
                GPIO.output(self.pin, GPIO.HIGH)

        else:
            GPIO.output(self.pin, GPIO.LOW)
            self.value = 0

        self.insertValue("values", self.value)


    
    