import React from 'react';
import '../assets/css/loading.css'; // Make sure to import your CSS file

const Loading = () => {
    return (
        <div className='loading'>
                <ul id="loading-dots">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className="img-nsec"></div>
        </div>


    );
};

export default Loading;
