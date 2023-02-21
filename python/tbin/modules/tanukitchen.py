# coding=utf-8
import json
import pymongo

class Tanukitchen:
    
    def __init__(self, jRoute):
        self.jRoute = jRoute
        self.data = {}
    
    def turnOn(self):
        self.readJson()
        self.setState(True)
    
    def turnOff(self):
        self.readJson()
        self.setState(False)
    
    def setState(self, val):
        with open(self.jRoute, "w") as modulos_json_salida:
            self.data["running"] = val
            # Escribir el archivo
            json.dump(self.data, modulos_json_salida, indent=4)
    
    def getState(self):
        self.readJson()
        return self.data["running"]
    
    def getData(self):
        return self.data
    
    def getModuleData(self, module):
        return self.data["modules"][module]
    
    def readJson(self):
        with open(self.jRoute) as modulos_json:
            self.data = json.load(modulos_json)
    
    