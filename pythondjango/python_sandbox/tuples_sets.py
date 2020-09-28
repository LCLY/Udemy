# A Tuple is a collection which is ordered and unchangeable. Allows duplicate members.


# simple tuple
fruit_tuple = ('Apple', 'Orange', 'Mango')

# get single value
# print(fruit_tuple[1])

# value cannot be changed, this will give error
# fruit_tuple[1] = 'Grape'

# tuples with one value should have trailing comma
fruit_tuple_2 = ('Apple',)

del fruit_tuple_2

# print(fruit_tuple_2)

# A Set is a collection which is unordered and unindexed. No duplicate members.
# create set
fruit_set = {'Apple',  'Orange', 'Mango'}


# add to set
fruit_set.add('Grape')
# remove from set
fruit_set.remove('Grape')
# clear set
fruit_set.clear()
# delete set
del fruit_set
print(fruit_set)
