#diceware list generator

import json

diceware = {}

#num = -1
arr = ['']
filename = input('Enter filename without .txt: ')

for ending in arr:
    #sometimes utf-8 works sometimes latin1 works
    #file1 = open(filename + str(ending) + '.txt', encoding='utf8')
    file1 = open(filename + str(ending) + '.txt', encoding='latin1')
    for a in file1:
        a = a.strip('\n')
        #'\t' for tab
        b = a.split(' ')
        key = b[0]
        value = b[1]
        diceware[key] = value
        #print(key,value)


# https://stackoverflow.com/questions/42825102/how-to-save-python-dictionary-into-json-files
with open(filename+".js", "w") as fp:
    fp.write('var ' + filename + ' = ')
    json.dump(diceware, fp)
