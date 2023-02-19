import json
from dotenv import load_dotenv

load_dotenv()

# Leer el archivo json como escritura
with open("/Users/erickpinzon/Documents/GitHub/tanukitchen-panel/python/modulos.json") as modulos_json:
    data = json.load(modulos_json)

with open("/Users/erickpinzon/Documents/GitHub/tanukitchen-panel/python/modulos.json", "w") as modulos_json_salida:
    data["running"] = False

    # Escribir el archivo
    json.dump(data, modulos_json_salida, indent=4)
    print("El programa ha sido detenido")