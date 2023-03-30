// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load handpose DONE
// 6. Detect function DONE
// 7. Drawing utilities DONE
// 8. Draw functions DONE

import React, { useRef, useState, useEffect } from 'react'
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App2.css";
import { drawHand } from "./utilities";
import DropDown from './DropDown/DropDown';
import { poseImages } from './pose_images';


let poseList = [
  'S', 'D', 'E', 'T', 'G',
  'N', 'R'
]

const CLASS_NO = {
0:'A',
1:'G',
2:'H',
3:'T',
4:'P',
}

function App2() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)


  const [bestPerform, setBestPerform] = useState('A')
  const [currentPose, setCurrentPose] = useState('H')
  const [isStartPose, setIsStartPose] = useState(false)

  function startSign(){
    setIsStartPose(true) 
    runHandpose();
  } 

  function stopPose() {
    setIsStartPose(false)
  }

  const runHandpose = async () => {
    const net = await handpose.load();
    
    const poseClassifier = await tf.loadLayersModel('https://s3.us-east-2.amazonaws.com/bengalivt.org/model.json')
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net, poseClassifier);
    }, 200);
  };



  const detect = async (net, poseClassifier) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand.length);

      const classification_feature = []
      for (let i = 0; i < hand.length; i++) {
        const keypoints = hand[i].landmarks;
        // console.log(keypoints)
        const bbox =  hand[i].boundingBox;
        // Log hand keypoints.
        for (let i = 0; i < keypoints.length; i++) {
          const [x, y, z] = keypoints[i];
          // console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          classification_feature.push(x - bbox.topLeft[0])
          classification_feature.push(y - bbox.topLeft[1])     
        }
      }
      // console.log(classification_feature)
      if (classification_feature.length === 42) {
        console.log(' perform classification')
        const classification = await poseClassifier.predict(tf.reshape(classification_feature, [1,42]))
        // await classification.array().then(array => console.log(array[0].indexOf(Math.max(...array[0]))));
        classification.array().then(array => console.log(array[0]));
        await classification.array().then(array => setBestPerform(CLASS_NO[array[0].indexOf(Math.max(...array[0]))]));
        // console.log(classification[1].dataSync())
        console.log('classification done')
      }
      setCurrentPose(currentPose)
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  // runHandpose();



  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <Webcam
  //         ref={webcamRef}
  //         style={{
  //           position: "absolute",
  //           marginLeft: "auto",
  //           marginRight: "auto",
  //           left: 0,
  //           right: 0,
  //           textAlign: "center",
  //           zindex: 9,
  //           width: 640,
  //           height: 480,
  //         }}
  //       />

  //       <canvas
  //         ref={canvasRef}
  //         style={{
  //           position: "absolute",
  //           marginLeft: "auto",
  //           marginRight: "auto",
  //           left: 0,
  //           right: 0,
  //           textAlign: "center",
  //           zindex: 9,
  //           width: 640,
  //           height: 480,
  //         }}
  //       />
  //     </header>
  //   </div>
  // );


  if(isStartPose) {
    return (
      <div className="sign-container">
        <div className="performance-container">
            <div className="pose-performance">
              <h4>Pose Attempted: {currentPose}</h4>
            </div>
            <div className="pose-performance">
              <h4>Pose Predicted: {bestPerform}</h4>
            </div>
          </div>
        <div>
          
          <Webcam 
          width='640px'
          height='480px'
          id="webcam"
          ref={webcamRef}
          style={{
            position: 'absolute',
            left: 120,
            top: 100,
            padding: '0px',
          }}
        />
          <canvas
            ref={canvasRef}
            id="my-canvas"
            width='640px'
            height='480px'
            style={{
              position: 'absolute',
              left: 120,
              top: 100,
              zIndex: 1
            }}
          >
          </canvas>
        <div>
            <img 
              src={poseImages[currentPose]}
              className="pose-img"
            />
          </div>
         
        </div>
        <button
          onClick={stopPose}
          className="secondary-btn"    
        >Stop Pose</button>
      </div>
    )
  }

  else{
    return (
      <div
        className="sign-container"
      >
        {/* <DropDown
          poseList={poseList}
          currentPose={currentPose}
          setCurrentPose={setCurrentPose}
        /> */}
        <button
            onClick={startSign}
            className="secondary-btn"  
          >Start Pose</button>
      </div>
    )

  }

  

}

export default App2;
