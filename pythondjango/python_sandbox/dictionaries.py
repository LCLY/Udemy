# A Dictionary is a collection which is unordered, changeable and indexed. No duplicate members.

# simple dict
person = {
    'first_name': 'John', 'last_name': 'Doe', 'age': 30
}

# access value
# print(person['first_name'])
# print(person.get('last_name'))

# add key/value
person['phone'] = '555-555-5555'

# get keys
# print(person.keys())

# get values
# print(person.items())

# make copy and modify
person2 = person.copy()
person2['city'] = 'Boston'

# remove item
del(person['age'])
person.pop('phone')

# clear
person.clear()

# get length
len(person)

# list of dict
people = [
    {'name': 'Marthe', "age": 40}, {'name': 'Bob', 'age': 20}
]
print(people[1]['name']) # print Bob
