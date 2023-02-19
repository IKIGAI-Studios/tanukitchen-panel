from modules.stove import Stove
from decouple import config

Stove(config('JSON_ROUTE')).turnOn()

print("Estufa encendida")