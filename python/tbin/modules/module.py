# coding=utf-8
import tbin.modules.bd.action_db as tanukitchenDB
from bson.objectid import ObjectId
from datetime import datetime
import RPi.GPIO as GPIO

#sudo apt-get update
#sudo apt-get install rpi.gpio


class Module:
    # Constructor
    def __init__(self, id, serial):
        self.id = id    
        self.serial = serial

        self.name = ""
        self.active = True
        self.value = 0
        self.target = 0

        self.getData()
    
    # Función para override
    def readValue(self):
        pass
    
    # Encender módulo
    def turnOn(self):
        self.updateModule(self.id, "active", True)
    
    # Apagar módulo
    def turnOff(self):
        self.updateModule(self.id, "active", False)
    
    # Obtener datos del módulo
    def getData(self):
        data = tanukitchenDB.getDocumentByFilter(
            "modules",
            {
                "_id": ObjectId(self.id)
            }
        )
        self.name = data["name"]
        self.active = data["active"]

        # Comprobaciones
        if self.name != "extractor":
            self.value = data["values"][0]["value"]
        
        if self.name == "stove":
            self.target = data["target"]

    
    # Actualizar un dato del módulo
    def updateModule(id, key, value):
        tanukitchenDB.update(
            "modules",
            {
                "_id": ObjectId(id),
            },
            {
                key: value
            }
        )
    
    # Insertar valor de lectura en el módulo
    def insertValue(self, array, value):
        tanukitchenDB.push(
            "modules",
            {
                "_id": ObjectId(self.id),
            },
            array,
            {
                "date": datetime.now(),
                "value": value
            },
            0
        )

    # Leer valores desde arduino
    def getValueFromArduino(self, name):
        line = self.serial.readline().decode('utf-8').rstrip()
        
        # Dividir la línea de datos en las partes correspondientes
        parts = line.split('|')

        for part in parts:
            
            if part == name:
                var = part.split(':')

                # Recuperar valor del módulos
                self.value = float(var[1])
           
