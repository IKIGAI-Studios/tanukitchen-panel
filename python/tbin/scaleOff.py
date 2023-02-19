from modules.scale import Scale
from decouple import config

Scale(config('JSON_ROUTE')).turnOff()

print("Bascula apagada")