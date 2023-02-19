import random

from .module import Module

class Stove(Module):
    
    def __init__(self, jRoute):
        super().__init__(jRoute, 1)
    
    def readValue(self):
        self.value = random.random() * 200

        self.readJson()
        self.writeJson("value", self.value)
    