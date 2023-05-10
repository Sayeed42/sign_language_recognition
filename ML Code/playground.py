labels_dict = {}
# for i in range(0, 24):
#     labels_dict[i] = str(i)

flag = 0
for n in range(0, 25):  # range of integer values
    letter = chr(ord('a') + n)  # convert integer to letter
    if letter == 'j':
        flag += 1
        continue
    labels_dict[n-flag] = letter.upper()
    #print(flag, n, letter)  # output: 'a', 'b', 'c', 'd', 'e'
print(labels_dict)