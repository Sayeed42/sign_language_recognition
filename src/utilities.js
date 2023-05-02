// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style

// Drawing function
export const drawHand = (predictions, ctx, style, confidenceScore, width) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      const landmarks = prediction.landmarks;

      let topLeft_x = 40000
      let topLeft_y = 40000
      let bottomRight_x = -50000
      let bottomRight_y = -50000
      for (let i = 0; i < landmarks.length; i++) {
        // Get x point
        if (landmarks[i][0]<topLeft_x) {
          topLeft_x = landmarks[i][0]
        }
        if (landmarks[i][1]<topLeft_y) {
          topLeft_y = landmarks[i][1]
        }
        if (landmarks[i][0]>bottomRight_x) {
          bottomRight_x = landmarks[i][0]
        }
        if (landmarks[i][1]>bottomRight_y) {
          bottomRight_y = landmarks[i][1]
        }
      }
      topLeft_x = topLeft_x - 20
      topLeft_y = topLeft_y - 20
      bottomRight_x = bottomRight_x + 20
      bottomRight_y = bottomRight_y + 20

      // const text = `Confidence: ${confidenceScore.toFixed(2)}`; // format the confidence score text
      // const textWidth = ctx.measureText(text).width; // get the width of the text
      // const textHeight = 20; // set the height of the text
      // const textX = topLeft_x + 10; // center the text horizontally on the bounding box
      // const textY = topLeft_y - 10; // position the text above the bounding box

      // Draw Bounding box
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(topLeft_x, topLeft_y, bottomRight_x - topLeft_x, bottomRight_y - topLeft_y);

      // // flip the context horizontally to fix mirroring
      // ctx.translate(textWidth, 0);
      // ctx.scale(-1, 1);

      // // flip the context back to the original state
      // //ctx.setTransform(1, 0, 0, 1, 0, 0);

      // // draw the confidence score text
      // ctx.fillStyle = 'red';
      // ctx.font = 'bold 16px Arial';
      // ctx.fillText(text, textX, textY);

      // ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      // Loop through landmarks and draw em
      for (let i = 0; i < landmarks.length; i++) {
        // Get x point
        const x = landmarks[i][0];
        // Get y point
        const y = landmarks[i][1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

        // Set line color
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};
