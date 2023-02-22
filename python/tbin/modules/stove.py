import random
import time

from .module import Module

class Stove(Module):
    
    def __init__(self, id):
        super().__init__(id)
    
    def readValue(self):
        if self.active:
            self.value = random.random() * 200
        else:
            self.value = 0

        self.insertValue("values", self.value)
    