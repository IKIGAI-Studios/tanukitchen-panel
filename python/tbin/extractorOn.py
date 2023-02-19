from modules.extractor import Extractor
from decouple import config

Extractor(config('JSON_ROUTE')).turnOn()

print("El extractor se ha encendido")