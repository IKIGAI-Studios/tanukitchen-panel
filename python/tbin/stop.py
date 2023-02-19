from modules.tanukitchen import Tanukitchen
from decouple import config

Tanukitchen(config('JSON_ROUTE')).turnOff()

print("El programa ha sido detenido")