import random
# import RPi.GPIO as GPIO
import time
from .module import Module

class SmokeDetector(Module):
    def __init__(self, jRoute):
        super().__init__(jRoute, 2)
        # GPIO.setmode(GPIO.BOARD)
        # GPIO.setup(16, GPIO.IN)
    
    def readValue(self):
        self.readJson()
        # if (self.data['modules'][self.position]['connected']):
        #     self.value = GPIO.input(16)
        # else :
        self.value = random.random() * 100

        self.writeJson("value", self.value)
    