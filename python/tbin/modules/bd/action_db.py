# Obtener la base de datos
from tbin.modules.bd.get_db import get_database

tanukitchenDB = get_database()

# Crear o recuperar la colección
def _getCollection(collection):
    return tanukitchenDB[collection] 

# Insertar 
def insert(collection, insDict):
    _getCollection(collection).insert_one(insDict)

# Eliminar 
def delete(collection, delDict):
    _getCollection(collection).delete_one(delDict)

# Actualizar
def update(collection, filterDict, updDict):
    _getCollection(collection).update_one(
        filterDict, 
        {
            "$set": updDict
        }
    )

# Meter un elemento a un arreglo
def push(collection, filterDict, array, elements, pos):
    _getCollection(collection).update_one(
        filterDict, 
        {
            "$push": {
                array: {
                    "$each": [elements],
                    "$position": pos
                },
            }
        }
    )

# Traer un documento por su id o flitrado
def getDocumentByFilter(collection, filterDict):
    return _getCollection(collection).find_one(
        filterDict
    )

# Traer una lista de documentos
def getDocuments(collection, filterDict):
    list = {}
    for modulo in _getCollection(collection).find(filterDict):
        list[modulo["name"]] = modulo
        
    return list
