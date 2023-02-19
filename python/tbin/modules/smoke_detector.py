import random

from .module import Module

class SmokeDetector(Module):
    
    def __init__(self, jRoute):
        super().__init__(jRoute, 2)
    
    def readValue(self):
        self.value = random.random() * 10

        self.readJson()
        self.writeJson("value", self.value)
    