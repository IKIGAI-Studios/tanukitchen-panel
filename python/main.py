# coding=utf-8
import time
from decouple import config

from tbin.modules.tanukitchen import Tanukitchen
from tbin.modules.scale import Scale
from tbin.modules.stove import Stove
from tbin.modules.smoke_detector import SmokeDetector
from tbin.modules.extractor import Extractor

jsonRoute = config('JSON_ROUTE')

tanukitchen = Tanukitchen(jsonRoute)
scale = Scale(jsonRoute)
stove = Stove(jsonRoute)
smoke = SmokeDetector(jsonRoute)
extractor = Extractor(jsonRoute)

def _process():
    while True:
        if tanukitchen.getState():
            print(time.ctime())
            # Verificar los modulos que están activos y recopilan datos
            # Bascula
            if tanukitchen.getModuleData(0)["state"]:
                scale.readValue()
            # Estufa
            if tanukitchen.getModuleData(1)["state"]:
                stove.readValue()
            # # Sensor de humo
            if tanukitchen.getModuleData(2)["state"]:
                smoke.readValue()
            # Extractor
            if tanukitchen.getModuleData(3)["state"]:
                extractor.extract()
            
            time.sleep(0.1)
        
        time.sleep(1)

        tanukitchen.readJson()

def __init__():
    tanukitchen.readJson()
    _process()