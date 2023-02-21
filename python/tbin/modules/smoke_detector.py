import random
# import RPi.GPIO as GPIO
import time
from .module import Module
import pymongo

class SmokeDetector(Module):
    def __init__(self, jRoute):
        super().__init__(jRoute, 2)
        # GPIO.setmode(GPIO.BOARD)
        # GPIO.setup(16, GPIO.IN)
    
    def readValue(self):
        self.readJson()
<<<<<<< Updated upstream
        # if (self.data['modules'][self.position]['connected']):
        #     self.value = GPIO.input(16)
        # else :
        self.value = random.random() * 10
=======
        self.value = random.random() * 100
>>>>>>> Stashed changes

        # Conectarse a la base de datos de MongoDB
        client = pymongo.MongoClient("mongodb+srv://root:root@tanucluster.98dt6wk.mongodb.net")
        db = client["myFirstDatabase"]
        collection = db["modules"]

        # Definir el filtro para seleccionar el documento a actualizar
        filtro = {"name": "smoke_detector"}

        # Definir los nuevos valores para el documento
        nuevos_valores = {"$set": {"value": self.value}}

        # Actualizar el documento en la colección
        collection.update_one(filtro, nuevos_valores)

        self.writeJson("value", self.value)
    