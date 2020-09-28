# A class is like a blueprint for creating objects. An object has properties and methods(functions) associated with it. Almost everything in Python is an object

# create class
class User:

    def __init__(self, name, email, age):  # constructor
        self.name = name
        self.email = email
        self.age = age

    def greeting(self):
        return f'My name is {self.name} and I am {self.age}'

  # function that edits property
    def has_birthday(self):
        self.age += 1


# customer class
class Customer(User):
    def __init__(self, name, email, age,):  # constructor
        self.name = name
        self.email = email
        self.age = age
        self.balance = 0

    def set_balance(self, balance):
        self.balance = balance

    def greeting(self):
        return f'My name is {self.name} and I am {self.age} and I owe a balance of {self.balance}'


# Init user object
brad = User('Brad Traversy', 'email@gmail.com', 37)
janet = User('Janet', 'janet@gmail.com', 15)

# Edit property
brad.age = 38
# call method
janet.has_birthday()  # now janet will be 16 yrs old
print(janet.greeting())


# init customer
john = Customer('John Doe', 'john@gmail.com', 40)
john.set_balance(500)
print(john.greeting())
