import pymongo
import json
from dotenv import load_dotenv
from decouple import config
from bson import json_util, ObjectId

# Conectarse a la base de datos
client = pymongo.MongoClient('mongodb+srv://root:root@tanucluster.98dt6wk.mongodb.net/myFirstDatabase')
db = client['myFirstDatabase']
collection = db['modules']

# Obtener los datos de la colección
query = {}  # consulta vacía para obtener todos los documentos
documents = collection.find(query)

# Crear un diccionario con los datos
data = {}
for document in documents:
    data[str(document['_id'])] = document

# Actualizar el archivo JSON
with open(config("JSON_ROUTE"), 'w') as file:
    json.dump(json_util.dumps(data), file, indent=4)