import random
import pymongo

from .module import Module

class Stove(Module):
    
    def __init__(self, jRoute):
        super().__init__(jRoute, 1)
    
    def readValue(self):
        self.value = random.random() * 200

        # Conectarse a la base de datos de MongoDB
        client = pymongo.MongoClient("mongodb+srv://root:root@tanucluster.98dt6wk.mongodb.net")
        db = client["myFirstDatabase"]
        collection = db["modules"]

        # Definir el filtro para seleccionar el documento a actualizar
        filtro = {"name": "stove"}

        # Definir los nuevos valores para el documento
        nuevos_valores = {"$set": {"value": self.value}}

        # Actualizar el documento en la colección
        collection.update_one(filtro, nuevos_valores)

        self.readJson()
        self.writeJson("value", self.value)