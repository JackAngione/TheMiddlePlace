import os, os.path
import random
import shutil
newOrder = list(range(1, 61))
random.shuffle(newOrder)
print(newOrder)
currentName = ""
newName = ""
for i in range(1, 61):
    currentName = "No."
    stringI = str(i)
    newOrderI = str(newOrder[i-1])
    shutil.copy2("./RENDERED_IMAGES/" + "No. " + stringI + ".jpg", "./SHUFFLED_IMAGES/No. " + newOrderI + ".jpg")