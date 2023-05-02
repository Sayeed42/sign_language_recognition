import React from 'react'
import { Link } from 'react-router-dom'

import './Usage.css'

import { usage, fixCamera } from '../text'

export default function Usage() {
    return (
        <div className="usage-container">
            <Link to='/'>
                    <button
                        className="btn"
                        id="home-btn"
                    >
                        Home
                    </button>
            </Link>
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
