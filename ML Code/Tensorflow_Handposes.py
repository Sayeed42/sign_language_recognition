import cv2
import numpy as np
import tensorflow as tf
from tensorflowjs.converters import load_keras_model

# Load the handpose model
model = load_keras_model('https://tfhub.dev/tensorflow/tfjs-model/handpose/1/default/1')

# Load the video feed from the webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert the frame to RGB for input to the model
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Reshape the image to match the input shape of the model
    input_image = np.expand_dims(cv2.resize(rgb, (256, 256)), axis=0)

    # Normalize the pixel values to [0, 1]
    input_image = input_image / 255.0

    # Get the predicted landmarks
    landmarks = model.predict(input_image)

    # Reshape the landmarks to (N, 2)
    landmarks = np.squeeze(landmarks)

    # Draw the landmarks on the frame
    for i in range(21):
        x, y = landmarks[i]
        cv2.circle(frame, (int(x), int(y)), 5, (0, 0, 255), -1)

    # Display the resulting frame
    cv2.imshow('Handpose', frame)

    # Exit if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close the window
cap.release()
cv2.destroyAllWindows()
