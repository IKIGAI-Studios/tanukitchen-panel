from modules.extractor import Extractor
from decouple import config

Extractor(config('JSON_ROUTE')).turnOff()

print("El extractor se detuvo")