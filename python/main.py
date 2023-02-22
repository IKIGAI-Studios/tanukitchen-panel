# coding=utf-8
import time
from decouple import config

from tbin.modules.tanukitchen import Tanukitchen
from tbin.modules.scale import Scale
from tbin.modules.stove import Stove
from tbin.modules.smoke_detector import SmokeDetector
from tbin.modules.extractor import Extractor

tanukitchen = Tanukitchen(config("TANUKITCHEN_ID"))

scale = object()
stove = object()
smoke = object()
extractor= object()

def _process():
    while True:
        # Actualizar datos de la cocina
        updateKitchenModules()

        if tanukitchen.active:
            print(time.ctime())
            
            scale.readValue()
            stove.readValue()
            smoke.readValue()

            if extractor.active:
                extractor.extract()
                
            time.sleep(0.1)
        time.sleep(5)

def updateKitchenModules():
    tanukitchen.getData()
    scale.getData()
    stove.getData()
    smoke.getData()
    extractor.getData()

def __init__():
    tanukitchen.getData()
    tanukitchen.getKitchenData()

    global scale, stove, smoke, extractor
    scale = Scale(tanukitchen.dataModules["scale"]["_id"])
    stove = Stove(tanukitchen.dataModules["stove"]["_id"])
    smoke = SmokeDetector(tanukitchen.dataModules["smoke_detector"]["_id"])
    extractor = Extractor(tanukitchen.dataModules["extractor"]["_id"])

    _process()