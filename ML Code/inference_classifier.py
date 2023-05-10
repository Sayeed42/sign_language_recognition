import pickle

import cv2
import mediapipe as mp
import numpy as np

from keras.models import load_model
from keras.models import Sequential
from keras.layers import Dense



model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

model3 = load_model('Saved Model/ANN-AEMNS-tanmoy.h5')
model2 = load_model('Saved Model/ANN-prothoma-tanmoy.h5')

cap = cv2.VideoCapture(0)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles

hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

# labels_dict = {0: 'A', 1: 'G', 2: 'H', 3:'T', 4:'P'}
labels_dict3 = {0: 'A', 1: 'E', 2: 'M', 3:'N', 4:'S'}

labels_dict = {}
# for i in range(0, 24):
#     labels_dict[i] = str(i)

flag = 0
for n in range(0, 26):  # range of integer values
    letter = chr(ord('a') + n)  # convert integer to letter
    if letter == 'j' or letter == 'z':
        flag += 1
        continue
    labels_dict[n-flag] = letter.upper()
    #print(n, letter)  # output: 'a', 'b', 'c', 'd', 'e'
print(labels_dict)
#labels_dict = {0: '0', 1: '1', 2: '2'}

while True:

    data_aux = []
    x_ = []
    y_ = []

    ret, frame = cap.read()

    H, W, _ = frame.shape

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(frame_rgb)


    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame,  # image to draw
                hand_landmarks,  # model output
                mp_hands.HAND_CONNECTIONS,  # hand connections
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())

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

        x1 = int(min(x_) * W) - 10
        y1 = int(min(y_) * H) - 10

        x2 = int(max(x_) * W) - 10
        y2 = int(max(y_) * H) - 10

        l = np.asarray(data_aux).shape
        print(l)

        if l[0] == 42:
            #continue

            input_data = np.asarray(data_aux)
            print(input_data)
            print(input_data.shape)
            input_data = input_data.reshape((1, -1))
            print(input_data.shape)

            # Generic Models
            prediction = model.predict([np.asarray(data_aux)])
            predict_proba = model.predict_proba([np.asarray(data_aux)])

            # make predictions
            # ANN model
            class_probabilities = model2.predict(input_data)  # probabilities for each class
            class_predictions = np.argmax(class_probabilities, axis=1)  # predicted class labels

            class_probabilities3 = model3.predict(input_data)  # probabilities for each class
            class_predictions3 = np.argmax(class_probabilities3, axis=1)  # predicted class labels

            print("---------------------")
            print(predict_proba, class_probabilities, class_probabilities3)

            #predicted_character = labels_dict[int(prediction[0])] #DT
            predicted_character = labels_dict[int(class_predictions)] # ANN
            predicted_character3 = labels_dict3[int(class_predictions3)]  # ANN3

            res = ""+str(predicted_character)+ " "+str(round(max(class_probabilities[0])*100))
            #res += " M2: " + str(predicted_character3) + " " + str(round(max(class_probabilities3[0]) * 100))

            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
            cv2.putText(frame, res, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3, cv2.LINE_AA)

    cv2.imshow('frame', frame)
    cv2.waitKey(1)


cap.release()
cv2.destroyAllWindows()
