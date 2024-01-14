import React from 'react';

const Question = ({ question }) => {
    return (
        <div className="question-container">
            <div className="question-content">
                <h1 className="question-text">{question}</h1>
            </div>
        </div>
    );
};

export default Question;
