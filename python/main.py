# coding=utf-8
import RPi.GPIO as GPIO
import time
import serial
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

PORT = '/dev/ttyACM0'
BAUDRATE = 9600

serial = serial.Serial(PORT, BAUDRATE)

PIN_STOVE = 23
PIN_EXTRACTOR = 24

def _process():
    while True:
        # Actualizar datos de la cocina
        updateKitchenModules()

        if tanukitchen.active:
            print(time.ctime())
            
            scale.readValue()
            stove.readValue()

            if stove.value > stove.target+stove.TOLERANCE:
                stove.turnOffRes()
            if stove.value < stove.target-stove.TOLERANCE and stove.active:
                stove.turnOnRes()

            smoke.readValue()

            if smoke.value > 40:
                extractor.turnOn()
            else:
                extractor.turnOff()
                
            time.sleep(0.1)
        time.sleep(0.2)

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
    scale = Scale(tanukitchen.dataModules["scale"]["_id"], serial)
    stove = Stove(tanukitchen.dataModules["stove"]["_id"], serial, PIN_STOVE)
    smoke = SmokeDetector(tanukitchen.dataModules["smoke_detector"]["_id"], serial)
    extractor = Extractor(tanukitchen.dataModules["extractor"]["_id"], serial, PIN_EXTRACTOR)

    _process()
