import React from 'react';
import './singleActivity.css';

const SingleActivity = ({activity}) => {
    return <div className="single-activity">
        <h3>{activity.name}</h3>
        <p>{activity.description}</p>
    </div>
}

export default SingleActivity;