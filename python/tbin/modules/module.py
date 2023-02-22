# coding=utf-8
import tbin.modules.bd.action_db as tanukitchenDB
from bson.objectid import ObjectId
from bson.datetime_ms import DatetimeMS
from datetime import datetime

class Module:

    def __init__(self, id):
        self.id = id

        self.name = ""
        self.active = True
        self.value = 0

        self.getData()
    
    def readValue(self):
        # Función para override
        pass

    def turnOn(self):
        self.updateModule(self.id, "active", True)
    
    def turnOff(self):
        self.updateModule(self.id, "active", False)
    
    def getData(self):
        data = tanukitchenDB.getDocumentById(
            "modules",
            {
                "_id": ObjectId(self.id)
            }
        )
        self.name = data["name"]
        self.active = data["active"]
    
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