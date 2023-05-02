import React from 'react'

import './Information.css'

export default function Information() {
    return (
        <div className="info-container">
            <h1 className="info-heading">Why is it important?</h1>
            <div className="info-main">
                <p className="info-content">
                American Sign Language (ASL) is a visual language used by the Deaf community in the United States and parts of Canada. It is a fully developed language with its own grammar, syntax, and vocabulary. ASL uses a combination of handshapes, facial expressions, and body language to convey meaning.
                </p>
                <p className="info-content">
                Learning sign language has many benefits, including improving communication skills, promoting inclusion and understanding of the Deaf community, and enhancing cognitive and motor skills. Additionally, learning sign language can provide career opportunities in fields such as education, interpretation, and social work.
                </p>
                <p className="info-content">
                It is also important to recognize the impact of language deprivation on the Deaf community. Many Deaf individuals do not have access to language in their early years, which can lead to delays in cognitive and linguistic development. Learning and using sign language can help prevent language deprivation and promote language acquisition for Deaf individuals.
                </p>
                <p className="info-content">
                One of the key challenges of learning and understanding sign language is the difference among some groups of signs can be very small and subtle. So it can be difficult to detect a particular sign. This system tries to group similar and confusing signs and tries to convey the subtle differences among them to the user. At the backend of this system, the AI model captures the differences and detects them correctly. So far, this system only covers all the letters of the English alphabet.
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
