from .module import Module

class Extractor(Module):
    
    def __init__(self, jRoute):
        super().__init__(jRoute, 3)
    
    def extract(self):
        print("Extrayendo...")

    def turnOff(self):
        self.readJson()
        self.writeJson("state", False)

    