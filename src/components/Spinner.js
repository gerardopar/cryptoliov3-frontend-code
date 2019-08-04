import React from 'react';

const spinner = () => (
    <div className="spinner__wrap">
        <div className="sk-folding-cube z-depth-5">
            <div className="sk-cube1 sk-cube z-depth-5" />
            <div className="sk-cube2 sk-cube z-depth-5" />
            <div className="sk-cube4 sk-cube z-depth-5" />
            <div className="sk-cube3 sk-cube z-depth-5" />
        </div>
    </div>
);

export default spinner;
