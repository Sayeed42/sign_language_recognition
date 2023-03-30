import React from 'react'

import './About.css'

export default function About() {
    return (
        <div className="about-container">
            <h1 className="about-heading">About</h1>
            <div className="about-main">
                <p className="about-content">
                    Description
                </p>
                <div className="developer-info">
                    <h4>About Developer</h4>
                    <p className="about-content">
                        People
                    </p>
                    <h4>Contact</h4>
                    {/* <a href="https://www.instagram.com/codedharsh75/"><p className="about-content">Instagram</p></a>
                    <a href="https://www.youtube.com/channel/UCiD7kslR7lKSaPGSQ-heOWg"><p  className="about-content">Youtube</p></a>
                    <a href="https://github.com/harshbhatt7585"><p  className="about-content">GitHub</p></a> */}
                </div>
            </div>
        </div>
    )
}
