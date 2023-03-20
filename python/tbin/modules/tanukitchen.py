# coding=utf-8
import tbin.modules.bd.action_db as tanukitchenDB
from bson.objectid import ObjectId

class Tanukitchen:
    
    def __init__(self, id):
        self.id = id

        self.name = ""
        self.active = True
        self.dataModules = {}

    def turnOn(self):
        self.updateKitchenValue("active", True)
    
    def turnOff(self):
        self.updateKitchenValue("active", False)
    
    def getData(self):
        data = tanukitchenDB.getDocumentByFilter(
            "kitchens",
            {
                "_id": ObjectId(self.id)
            }
        )
        self.name = data["name"]
        self.active = data["active"]
    
    def updateKitchenValue(self, key, value):
        tanukitchenDB.update(
            "kitchens",
            {
                "_id": ObjectId(self.id)
            },
            {
                key: value
            }
        )
    
    def getKitchenData(self):
        self.dataModules = tanukitchenDB.getDocuments(
            "modules",
            {
                "id_kitchen": self.name
            }
        )
    