from modules.tanukitchen import Tanukitchen
from decouple import config

Tanukitchen(config('JSON_ROUTE')).turnOn()

print("El programa ha sido reanudado")
    