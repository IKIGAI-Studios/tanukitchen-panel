# Get the database
from tbin.modules.bd.get_db import get_database

tanukitchenDB = get_database()

# Create or get a collection
def _getCollection(collection):
    return tanukitchenDB[collection] 

# Insert
def insert(collection, insDict):
    _getCollection(collection).insert_one(insDict)

# Delete 
def delete(collection, delDict):
    _getCollection(collection).delete_one(delDict)

# Update
def update(collection, filterDict, updDict):
    _getCollection(collection).update_one(
        filterDict, 
        {
            "$set": {
                updDict
            }
        }
    )

# Push element in array
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

# Get document by id
def getDocumentById(collection, filterDict):
    return _getCollection(collection).find_one(
        filterDict
    )

def getDocuments(collection, filterDict):
    list = {}
    for modulo in _getCollection(collection).find(filterDict):
        list[modulo["name"]] = modulo
        
    return list
