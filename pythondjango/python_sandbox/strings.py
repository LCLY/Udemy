# Strings in python are surrounded by either single or double quotation marks. Let's look at string formatting and some string methods
name = 'Brad'
age = 37

# Concatenate
print('Hello I am ' + name + 'and I am ' + str(age))
# String Formatting

# Arguments by position
print('{}, {}, {}'.format('a', 'b', 'c'))  # a, b, c
print('{1}, {2}, {0}'.format('a', 'b', 'c'))  # b, c, a

# Arguments by name
print('My name is {name} and I am {age}'.format(name="Brad", age="37"))

# F-Strings (only in 3.6+)
print(f'My name is {name} and I am {age}')

# String Methods
s = 'helLo there world'

# capitalize first letter
print(s.capitalize())
# capitalize all letter
print(s.upper())
# lowercase all letter
print(s.lower())
# swap case
print(s.swapcase())
# get length
print(len(s))
# replace
print(s.replace('world', 'everyone'))
# count
sub = 'h'
print(s.count(sub))
# starts with
print(s.startswith('helLo'))
# ends with
print(s.endswith('world'))
# split into a list
print(s.split())
# find position
print(s.find('r'))
# is all alphanumeric
print(s.isalnum())
# is all alphabetic
print(s.isalpha())
# is all numeric
print(s.isnumeric())
