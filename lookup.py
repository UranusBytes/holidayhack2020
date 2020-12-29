import string
import subprocess
import json
import os
import time

lookup = [{},{},{},{},{},{},{},{},{},{}]
for current_char in string.ascii_letters + string.digits:
  vending = subprocess.Popen(["/home/elf/lab/vending-machines"],
                               stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE,
                               universal_newlines=True,
                               bufsize=0)

  raw_password = ''.join([char*10 for char in current_char])
  vending.stdin.write(f"{raw_password}\n{raw_password}\n{raw_password}\n")
  time.sleep(1)
  vending.stdin.close()

  with open('/home/elf/lab/vending-machines.json', 'r') as json_file:
    conf = json.load(json_file)

  os.remove('/home/elf/lab/vending-machines.json')

  new_password = conf['password']

  for index in range(0,10):
    lookup[index][new_password[index]]=current_char

for index in range(0, 10):
  print(sorted(lookup[index]))

ciphered_password = "LVEdQPpBwr"
deciphered_password = ""
for index in range(0, 10):
  deciphered_password += lookup[index][ciphered_password[index]]

print(f"{ciphered_password} = {deciphered_password}")