import React from 'react'

import './Information.css'

export default function Information() {
    return (
        <div className="info-container">
            <h1 className="info-heading">Why is it important?</h1>
            <div className="info-main">
                <p className="info-content">
                    
                </p>
                <div className="developer-info">
                    <h4>Developers</h4>
                    <p className="info-content">
                    Tanmoy Sarkar Pias, Anirban Mukhopadhyay, Md Sayeedul Islam
                    </p>
                    <h4>Code</h4>
                    <a href="https://github.com/Sayeed42/sign_language_recognition"><p className="info-content">GitHub Link</p></a>
                </div>
            </div>
        </div>
    )
}
