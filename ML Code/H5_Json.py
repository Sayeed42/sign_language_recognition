from keras.models import load_model
from keras.models import Sequential
from keras.layers import Dense
import tensorflowjs as tfjs



model = load_model('Saved Model/ANN-prothoma-tanmoy.h5')


tfjs.converters.save_keras_model(model, 'web-models/model-all2')



#
# # Convert the model to JSON
# json_model = model.to_json()
#
# # Save the JSON model to a file
# with open('model.json', 'w') as json_file:
#     json_file.write(json_model)