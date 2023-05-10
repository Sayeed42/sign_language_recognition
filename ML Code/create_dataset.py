import os
import pickle

import mediapipe as mp
import cv2
import matplotlib.pyplot as plt
import pandas as pd
from collections import Counter



mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

DATA_DIR = './Raw-Data/data-prothoma-tanmoy'

data = []
labels = []
print(os.listdir(DATA_DIR))
for dir_ in os.listdir(DATA_DIR):
    print(dir_)
    for img_path in os.listdir(os.path.join(DATA_DIR, dir_)):
        data_aux = []

        x_ = []
        y_ = []

        img = cv2.imread(os.path.join(DATA_DIR, dir_, img_path))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        results = hands.process(img_rgb)
        #print(results)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:

                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y

                    x_.append(x)
                    y_.append(y)

                for i in range(len(hand_landmarks.landmark)):
                    x = hand_landmarks.landmark[i].x
                    y = hand_landmarks.landmark[i].y

                    data_aux.append(x - min(x_))
                    data_aux.append(y - min(y_))

            if len(data_aux) == 42: # Pias added this to flag 2 hands - 84 points
                data.append(data_aux)
                labels.append(dir_)

print(len(data), len(data[0]))


# df = {'data': data, 'label': labels}
df = pd.DataFrame(data)
print('data:', df.shape)


# create a Counter object to count the frequency of each element
my_counter = Counter(labels)
# convert the Counter object to a dictionary and print the results
my_dict = dict(my_counter)
# df.to_csv('df-data-AGHTP-300.csv', index=False)
print('labels:',my_dict)

#f = open('data.pickle', 'wb')
# f = open('data-AGHTP-300.pickle', 'wb')
f = open('data-packed/data-prothoma-tanmoy.pickle', 'wb')
pickle.dump({'data': data, 'labels': labels}, f)
f.close()
