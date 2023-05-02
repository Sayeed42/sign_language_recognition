// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load handpose DONE
// 6. Detect function DONE
// 7. Drawing utilities DONE
// 8. Draw functions DONE

import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App2.css";
import { drawHand } from "./utilities";
import DropDown from './DropDown/DropDown';
import { poseImages } from './pose_images';
import { poseImages_sign } from './pose_images';


let poseList = [
  'G', 'H', 'T', 'P', 'K', 'L', 'Q', 'A', 'E', 'M', 'N', 'S', 'C', 'O', 'F', 'R', 'U', 'D', 'I', 'B', 'V', 'W', 'X', 'Y'
]

// const CLASS_NO = {
// 0:'A',
// 1:'G',
// 2:'H',
// 3:'T',
// 4:'P',
// }

const CLASS_NO_SUBSET = {
  0:'A',
  1:'E',
  2:'M',
  3:'N',
  4:'S',
}

const CLASS_NO = {
  0:'A',
  1:'B',
  2:'C',
  3:'D',
  4:'E',
  5:'F',
  6:'G',
  7:'H',
  8:'I',
  9:'K',
  10:'L',
  11:'M',
  12:'N',
  13:'O',
  14:'P',
  15:'Q',
  16:'R',
  17:'S',
  18:'T',
  19:'U',
  20:'V',
  21:'W',
  22:'X',
  23:'Y',
  }

let interval

const style1 = {
  0: { color: "yellow", size: 15 },
  1: { color: "gold", size: 6 },
  2: { color: "green", size: 10 },
  3: { color: "gold", size: 6 },
  4: { color: "gold", size: 6 },
  5: { color: "purple", size: 10 },
  6: { color: "gold", size: 6 },
  7: { color: "gold", size: 6 },
  8: { color: "gold", size: 6 },
  9: { color: "blue", size: 10 },
  10: { color: "gold", size: 6 },
  11: { color: "gold", size: 6 },
  12: { color: "gold", size: 6 },
  13: { color: "red", size: 10 },
  14: { color: "gold", size: 6 },
  15: { color: "gold", size: 6 },
  16: { color: "gold", size: 6 },
  17: { color: "orange", size: 10 },
  18: { color: "gold", size: 6 },
  19: { color: "gold", size: 6 },
  20: { color: "gold", size: 6 },
};

const style2 = {
  0: { color: "green", size: 15 },
  1: { color: "green", size: 6 },
  2: { color: "green", size: 10 },
  3: { color: "green", size: 6 },
  4: { color: "green", size: 6 },
  5: { color: "green", size: 10 },
  6: { color: "green", size: 6 },
  7: { color: "green", size: 6 },
  8: { color: "green", size: 6 },
  9: { color: "green", size: 10 },
  10: { color: "green", size: 6 },
  11: { color: "green", size: 6 },
  12: { color: "green", size: 6 },
  13: { color: "green", size: 10 },
  14: { color: "green", size: 6 },
  15: { color: "green", size: 6 },
  16: { color: "green", size: 6 },
  17: { color: "green", size: 10 },
  18: { color: "green", size: 6 },
  19: { color: "green", size: 6 },
  20: { color: "green", size: 6 },
};

function App2() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)


  const [bestPerform, setBestPerform] = useState('A')
  const [currentPose, setCurrentPose] = useState('A')
  const [isStartPose, setIsStartPose] = useState(false)
  const [confidence, setConfidence] = useState('')

  function startSign(){
    setIsStartPose(true) 
    runHandpose();
  } 

  function stopPose() {
    setIsStartPose(false)
    clearInterval(interval)
  }

  const runHandpose = async () => {
    const net = await handpose.load();
    
    // const poseClassifier = await tf.loadLayersModel('https://s3.us-east-2.amazonaws.com/bengalivt.org/model.json')
    const poseClassifier = await tf.loadLayersModel('https://s3.us-east-2.amazonaws.com/bengalivt.org/sign_model/model.json')
    // const poseClassifier = await tf.loadLayersModel('https://s3.us-east-2.amazonaws.com/bengalivt.org/sign_model/model_all/model.json')

    const poseClassifier_subset = await tf.loadLayersModel('https://s3.us-east-2.amazonaws.com/bengalivt.org/sign_model/model_subset/model.json')
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    interval = setInterval(() => {
      if (currentPose === 'A' || currentPose === 'E' || currentPose === 'M' || currentPose === 'N' || currentPose === 'S') {
        detect(net, poseClassifier_subset, CLASS_NO_SUBSET);
      }
      else {
        detect(net, poseClassifier, CLASS_NO);
      }
      
    }, 100);
  };



  const detect = async (net, poseClassifier, mapping) => {
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
      // webcamRef.style.transform = "scale(-1,1)";

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
        let topLeft_x = 40000
        let topLeft_y = 40000

        for (let i = 0; i < keypoints.length; i++) {
          // Get x point
          if (keypoints[i][0]<topLeft_x) {
            topLeft_x = keypoints[i][0]
          }
          if (keypoints[i][1]<topLeft_y) {
            topLeft_y = keypoints[i][1]
          }
        }
        // Log hand keypoints.
        for (let i = 0; i < keypoints.length; i++) {
          const [x, y, z] = keypoints[i];
          // console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
          classification_feature.push(x - topLeft_x)
          classification_feature.push(y - topLeft_y)     
        }
      }
      let pred =''
      let pred_conf = 0
      // console.log(classification_feature)
      if (classification_feature.length === 42) {
        console.log(' perform classification')
        const classification = await poseClassifier.predict(tf.reshape(classification_feature, [1,42]))
        // await classification.array().then(array => console.log(array[0].indexOf(Math.max(...array[0]))));
        classification.array().then(array => pred_conf = Math.max(...array[0]));
        await classification.array().then(array => {pred = mapping[array[0].indexOf(Math.max(...array[0]))]});
        setBestPerform(pred)
        setConfidence(pred_conf.toFixed(2))
        // console.log(classification[1].dataSync())
        console.log('classification done')
      }
      else{
        setBestPerform('')
        setConfidence('')
      }
      // setCurrentPose(currentPose)
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      console.log(pred)
      if (pred === currentPose)
      {
        drawHand(hand, ctx, style2, pred_conf, canvasRef.current.width);
      }
      else
      {
        drawHand(hand, ctx, style1, pred_conf, canvasRef.current.width);
      }
      
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
            <div className="pose-performance">
              <h4>Confidence: {confidence}</h4>
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
              src={poseImages_sign[currentPose]}
              className="pose-img"
            />
            <button
              onClick={stopPose}
              className="secondary-btn"    
            >Stop Pose</button>
          </div>
 
        </div>

      </div>
    )
  }

    return (
      <div
        className="sign-container"
      >
        <Link to='/'>
          <button
              className="btn"
              id="home-btn"
          >
              Home
          </button>
        </Link>
        <DropDown
          poseList={poseList}
          currentPose={currentPose}
          setCurrentPose={setCurrentPose}
        />
        <button
            onClick={startSign}
            className="secondary-btn"  
          >Start Pose</button>
      </div>
    )
}

export default App2;
