import React from 'react'

import './Usage.css'

import { usage, fixCamera } from '../text'

export default function Usage() {
    return (
        <div className="usage-container">
            <h1 className="usage-heading">How to Use</h1>
            <div className="usage-content-container">
                {usage.map((tutorial) => (
                    <p className="usage-content">{tutorial}</p>
                ))}
            </div>
            <h1 className="usage-heading">Camera Not Working?</h1>
            <div className="usage-content-container">
                {fixCamera.map((points) => (
                    <p className="usage-content">{points}</p>
                ))}
            </div>
            
        </div>
    )
}
