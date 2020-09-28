# If/ Else conditions are used to decide to do something based on something being true or false

x = 9
y = 16

# Comparison Operators (==, !=, >, <, >=, <=) - Used to compare values

# Simple if
if x == y:
    print(f'{x} is equal to {y}')

if x > y:
    print(f'{x} is greater than {y}')
elif x == y:
    print(f'{x} is equal to {y}')
else:
    print(f'{x} is less than {y}')

    # Nested if
    if x > 2:
        if x <= 10:
            print(f'{x} is more than 2 and {x} is less than 10')

    # Logical operators (and, or, not) - Used to combine conditional statements

if x > 2 and x <= 10:
    print(f'{x} is greater than 2 and {x} is less than 10')
if x > 2 or x <= 10:
    print(f'{x} is greater than 2 or {x} is less than 10')
if not(x == y):
    print(f'{x} is not equal to {y}')

# Membership Operators (not, not in) - Membership operators are used to test if a sequence is presented in an object
num = 6
numbers = [1, 2, 3, 4, 5]
if num in numbers:
    print(num in numbers)

if num not in numbers:
    print(num not in numbers)
# Identity Operators (is, is not) - Compare the objects, not if they are equal, but if they are actually the same object, with the same memory location:

if x is y:
  print(x is y)
if x is not y:
  print(x is not y)