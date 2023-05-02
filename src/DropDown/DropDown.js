import React, { useState } from 'react'

import { poseImages } from '../pose_images'

import './DropDown.css'

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
  
    const handleSelect = (pose) => {
      setIsOpen(false);
      setCurrentPose(pose);
    };
  
    return (
      <div className='dropdown dropdown-container'>
        <button 
          className="btn btn-secondary dropdown-toggle"
          type='button'
          onClick={handleToggle}
        >
          {currentPose}
        </button>
        <ul 
          className={`dropdown-menu dropdown-custom-menu ${isOpen ? 'show' : ''}`}
          aria-labelledby="pose-dropdown-btn"
        >
          {poseList.map((pose) => (
            <li 
              key={pose} 
              onClick={() => handleSelect(pose)}
            >
              <div className="dropdown-item-container">
                <p className="dropdown-item-1">{pose}</p>
                <img 
                  src={poseImages[pose]}
                  className="dropdown-img"
                />
              </div>
            </li>
          ))}
        </ul> 
      </div>
    );
  }
 