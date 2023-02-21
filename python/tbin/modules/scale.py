import random
import pymongo

from .module import Module

class Scale(Module):
    
    def __init__(self, jRoute):
        super().__init__(jRoute, 0)
    
    def readValue(self):
        self.value = random.random() * 100

        # Conectarse a la base de datos de MongoDB
        client = pymongo.MongoClient("mongodb+srv://root:root@tanucluster.98dt6wk.mongodb.net")
        db = client["myFirstDatabase"]
        collection = db["modules"]

        # Definir el filtro para seleccionar el documento a actualizar
        filtro = {"name": "scale"}

        # Definir los nuevos valores para el documento
        nuevos_valores = {"$set": {"value": self.value}}

        # Actualizar el documento en la colección
        collection.update_one(filtro, nuevos_valores)

        self.readJson()
        self.writeJson("value", self.value)
    