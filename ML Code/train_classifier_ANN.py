import pickle

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from keras.losses import categorical_crossentropy
from keras.models import Sequential
from keras.layers import Dense

import numpy as np


#data_dict = pickle.load(open('./data.pickle', 'rb'))
# data_dict = pickle.load(open('./data-AGHTP-300.pickle', 'rb'))
data_dict = pickle.load(open('./data-packed/data-prothoma-tanmoy.pickle', 'rb'))
num_classes = 24

data = np.asarray(data_dict['data'])

print(data.shape)

labels = np.asarray(data_dict['labels'])
print(labels.shape)
labels = keras.utils.to_categorical(labels, num_classes)
print(labels.shape)

x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, shuffle=True, stratify=labels)

print(x_train.shape)
print(y_train.shape, y_test.shape)



# Define the model
model = Sequential() #Artificial Neural Net
model.add(Dense(64, input_dim=x_train.shape[1], activation='relu'))
model.add(Dense(32, activation='relu'))
model.add(Dense(16, activation='relu'))
model.add(Dense(num_classes, activation='softmax'))

# Compile the model
model.compile(loss="categorical_crossentropy", optimizer='adam', metrics=['accuracy'])

# Train the model
model.fit(x_train, y_train, epochs=100, batch_size=10, validation_data=(x_test, y_test), verbose=1)

# Evaluate the model
score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

model.save('Saved Model/ANN-prothoma-tanmoy.h5')

# # Convert the model to JSON
# json_model = model.to_json()
#
# # Save the JSON model to a file
# with open('model2.json', 'w') as json_file:
#     json_file.write(json_model)


#
#
# model = RandomForestClassifier()
#
# model.fit(x_train, y_train)
#
# y_predict = model.predict(x_test)
#
# score = accuracy_score(y_predict, y_test)
#
# print('{}% of samples were classified correctly !'.format(score * 100))
#
# f = open('model.p', 'wb')
# pickle.dump({'model': model}, f)
# f.close()
