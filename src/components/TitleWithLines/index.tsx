import React from 'react';
import './index.css';

const TitleWithLines = ({ text }) => {
    return (
        <div className="title-with-lines">
            <div className="line"></div>
            <div className="text">{text}</div>
            <div className="line"></div>
        </div>
    );
};

export default TitleWithLines;