#diceware list generator

import json
import re

diceware = {}

#num = -1
arr = ['']
filename = input('Enter filename without .txt: ')

for ending in arr:
	#sometimes utf-8 works sometimes latin1 works
	#file1 = open(filename + str(ending) + '.txt', encoding='utf8')
	file1 = open(filename + str(ending) + '.txt', encoding='latin1')
	newarr = ''
	for a in file1:
		#print(a)
		#print('asdf')
		a = a.strip('\n')
		#newline = re.sub('( +)', '\n', a)
		newline = re.sub('( +)', '\n', a)
		newarr = newarr + newline

"""
		a = a.strip('\n')
		#'\t' for tab
		b = a.split(' ')
		key = b[0]
		value = b[1]
		diceware[key] = value
		#print(key,value)

mnemonic_encoding_wordlist
# https://stackoverflow.com/questions/42825102/how-to-save-python-dictionary-into-json-files
with open(filename+".js", "w") as fp:
	fp.write('var ' + filename + ' = ')
	json.dump(diceware, fp)
"""
#print(newarr)
#print(' ')
newtext = re.sub('\n\n', '\n', newarr)
print(newtext)

b = newtext.split('\n')
print(b)

k = len(b)
print(k)

i = 0
numbered = ''
for ia in range(1,7):
	for ib in range(1,7):
		for ic in range(1,7):
			for id in range(1,7):
				number = str(ia) + str(ib) + str(ic) + str(id)
				thisline = number + ' ' + b[i] + '\n'
				numbered = numbered + thisline
				i = i + 1

print(numbered)


i = 0
jsonnumbered = {}
for ia in range(1,7):
	for ib in range(1,7):
		for ic in range(1,7):
			for id in range(1,7):
				number = str(ia) + str(ib) + str(ic) + str(id)
				thisline = b[i]
				jsonnumbered[number] = thisline
				i = i + 1

print(jsonnumbered)

#with open('az' + filename + '.txt', 'w') as jk:
#	jk.write(numbered)
# https://stackoverflow.com/questions/42825102/how-to-save-python-dictionary-into-json-files
with open(filename+".js", "w") as fp:
	fp.write('var ' + filename + ' = ')
	json.dump(jsonnumbered, fp)