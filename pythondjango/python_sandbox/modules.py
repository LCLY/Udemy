# A module is basically a file containing a set of functions to include in your
# application. There are core python modules, modules you can install using the
# pip package manager (including Django) as well as custom modules

# Core modules

import validator
from validator import validate_email
import datetime
from datetime import date  # this is like destructure in js
import time
from time import time

# Pip modules
import camelcase
# today = datetime.date.today()
today = date.today()
# print(today)

timestamp = time()
# print(timestamp)

camel = camelcase.CamelCase()
text = "hello there world"
print(camel.hump(text))

# custom modules

email = 'test@test.com'
if validate_email(email):
    print('Email is valid')
else:
    print('not an email')
