# A function is a block of code which only runs when it is called. In Python, we do not use parentheses and curly brackets, we use indentation with tabs or spaces

# create function
def sayHello(name='defaultvalue'):
    print('Hello' + name)


sayHello('test')


def getSum(num1, num2):
    total = num1 + num2
    return total


def addOnetoNum(num):
    num += 1
    return num


num = 5
new_num = addOnetoNum(num)
print(new_num)


def getSum(num1, num2): return num1 + num2

# A lambda function is a small anonymous function.
# A lambda function can take any number of arguments, but can only have one expression. Very similar to JS arrow functions
