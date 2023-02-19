from modules.smoke_detector import SmokeDetector
from decouple import config

SmokeDetector(config('JSON_ROUTE')).turnOn()

print("Detector de humo encendido")