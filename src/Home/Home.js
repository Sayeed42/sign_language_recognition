import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

export default function Home() {

    return (
        <div className='home-container'>
            <div className='home-header'>
                <h1 className='home-heading'>CS6724 Human-AI Interaction</h1>
                <Link to='/usage'>
                    <button
                        className="btn btn-secondary"
                        id="about-btn"
                    >
                        How to Use
                    </button>
                </Link>
            </div>

            <h1 className="description">Interactive Sign Language
Learning System</h1>
            <div className="home-main">
                <div className="btn-section">
                    <Link to='/start'>
                        <button
                            className="btn start-btn"
                        >Let's Start</button>
                    </Link>
                    <Link to='/information'>
                        <button
                            className="btn start-btn"
                        >Information</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}