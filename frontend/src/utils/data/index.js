export const poseInstructions = {
    D: [

        ],
    E: [
        
    ],
    G: [
        
    ],
    M: [
        
    ],
    N: [
        
    ],
    R: [
        
    ],
    S: [
        
    ],
    T: [
        
    ]
}


export const tutorials = [
    '1. When App ask for permission of camera, allow it to access to capture pose.',
    '2. Select what pose you want to do in the dropdown.',
    '3. Read Instrctions of that pose so you will know how to do that pose.',
    '4. Click on Start pose and see the image of the that pose in the right side and replecate that image in front of camera.',
    '5. If you will do correctly the skeleton over the video will become green in color and sound will start playing'
]

export const fixCamera = [
    'Solution 1. Make sure you have allowed the permission of camera, if you have denined the permission, go to setting of your browser to allow the access of camera to the application.',
    'Solution 2. Make sure no any other application is not accessing camera at that time, if yes, close that application',
    'Solution 3. Try to close all the other opened broswers'
] 

export const POINTS = {
    NOSE : 0,
    LEFT_EYE : 1,
    RIGHT_EYE : 2,
    LEFT_EAR : 3,
    RIGHT_EAR : 4,
    LEFT_SHOULDER : 5,
    RIGHT_SHOULDER : 6,
    LEFT_ELBOW : 7,
    RIGHT_ELBOW : 8,
    LEFT_WRIST : 9,
    RIGHT_WRIST : 10,
    LEFT_HIP : 11,
    RIGHT_HIP : 12,
    LEFT_KNEE : 13,
    RIGHT_KNEE : 14,
    LEFT_ANKLE : 15,
    RIGHT_ANKLE : 16,
}

export const keypointConnections = {
    nose: ['left_ear', 'right_ear'],
    left_ear: ['left_shoulder'],
    right_ear: ['right_shoulder'],
    left_shoulder: ['right_shoulder', 'left_elbow', 'left_hip'],
    right_shoulder: ['right_elbow', 'right_hip'],
    left_elbow: ['left_wrist'],
    right_elbow: ['right_wrist'],
    left_hip: ['left_knee', 'right_hip'],
    right_hip: ['right_knee'],
    left_knee: ['left_ankle'],
    right_knee: ['right_ankle']
}