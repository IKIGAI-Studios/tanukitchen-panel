# Get the database
from get_db import get_database
from dateutil import parser

tanukitchen = get_database()

# Create or get a collection
users = tanukitchen["users"]

# Fecha
date = '2023-02-19T00:00:00.000Z'
pDate = parser.parse(date)

# Insert with insert_many()
test = {
    "user": "jose123",
    "password": "asjdsajsd",
    "name": "El tercero wn",
    "date": pDate
}

users.insert_one(test)
