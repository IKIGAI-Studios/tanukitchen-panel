import random

from .module import Module

class Scale(Module):
    
    def __init__(self, jRoute):
        super().__init__(jRoute, 0)
    
    def readValue(self):
        self.value = random.random() * 100

        self.readJson()
        self.writeJson("value", self.value)
    