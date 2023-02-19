# coding=utf-8
import json

class Module:

    def __init__(self, jRoute, position):
        self.jRoute = jRoute
        self.position = position
        self.data = {}
        self.value = 0
    
    def readValue(self):
        # Función para override
        pass

    def getValue(self):
        return self.value  

    def turnOn(self):
        self.readJson()
        self.writeJson("state", True)
    
    def turnOff(self):
        self.readJson()
        self.writeJson("state", False)
        self.writeJson("value", 0)

    def writeJson(self, attr, val):
        with open(self.jRoute, "w") as modulos_json_salida:
            self.data["modules"][self.position][attr] = val
            # Escribir el archivo
            json.dump(self.data, modulos_json_salida, indent=4)
    
    def readJson(self):
        with open(self.jRoute) as modulos_json:
            self.data = json.load(modulos_json)