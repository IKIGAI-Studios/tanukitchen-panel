from .module import Module
import time

from .module import Module

class Extractor(Module):
    
    def __init__(self, id):
        super().__init__(id)
    
    def extract(self):
        print("Extrayendo...")
        

    def turnOn(self):
        super().turnOn()
        self.insertValue("actions", "Turned On")

    def turnOff(self):
        super().turnOff()
        self.insertValue("actions", "Turned Off")