# Python has functions for creating, reading, updating, and deleting files.

# Open a file
myFile = open('myfile.txt', 'w')  # w is to write the file

# get info
print('Name: ', myFile.name)
print('is Closed: ', myFile.closed)
print('Opening mode: ', myFile.mode)

# Write to file
myFile.write('I love Python')
myFile.write(' and Javascript')
myFile.close()

# Append to file
# a = append, if we do w, it will just overwrite what is existing
myFile = open('myFile.txt', 'a')
# although we are using write function but since we open the file as append mode, we will just append strings
myFile.write(' I also like PHP')
myFile.close()

# Read from a file
myFile = open('myFile.txt', 'r+')
text = myFile.read(10)  # read first 10 characters of the file
print(text)
