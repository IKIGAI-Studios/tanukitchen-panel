# LIBRERIAS
# * Install pymongo
# python -m pip install "pymongo[srv]"
# * Trabajar con fechas
# python -m pip install python-dateutil

from pymongo import MongoClient
from decouple import config
def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = config('MONGO_CONNECTION_LINK')
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client[config('MONGO_DB_NAME')]
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()