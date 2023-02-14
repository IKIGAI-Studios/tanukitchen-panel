import time
import json

# Importar archivo json
data = {}

def updateData():
    with open("C:/Users/erick/Documents/GitHub/tanukitchen-panel/python/modulos.json") as modulos_json:
        global data
        data = json.load(modulos_json)

def _process():
    while True:
        if data["running"]:
            print(time.ctime())
            print(data["modulos"])
            time.sleep(1)
        time.sleep(0.2)
        updateData()

def __init__():
    updateData()
    _process()