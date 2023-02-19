from modules.smoke_detector import SmokeDetector
from decouple import config

SmokeDetector(config('JSON_ROUTE')).turnOff()

print("Detector de humo apagado")