# JSON is commonly used with data APIS. Here how we can parse JSON into a Python dictionary

import json

# Sample JSON
userJSON = '{"first_name":"John","last_name":"Doe","age":30}'

# parse to dict
user = json.loads(userJSON)  # this is equivalent to JSON.parse in js

print(user)
print(user["first_name"])  # prints John

# init new dict of car
car = {"make": 'ford', 'model': 'mustang', 'year': 1970}
# dump - parse dict into JSON
carJSON = json.dumps(car)
print(carJSON)
