# A List is a collection which is ordered and changeable. Allows duplicate members.

numbers = [1, 2, 3, 4, 5]
fruits = ['apples', 'oranges', 'grapes', 'pears']

print(fruits[1])
print(len(fruits))

# append to list, in javascript we use push
fruits.append('Mangos')

# to remove from list
fruits.remove('grapes')

# insert into specific position
fruits.insert(2, 'strawberries')

# remove from a certain position
fruits.pop(3)

# reverse list
fruits.reverse()

# sort list
fruits.sort()

# reverse sort
fruits.sort(reverse=True)
print(fruits)
