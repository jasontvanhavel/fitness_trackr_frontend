import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SingleActivity from './SingleActivity';
import ActivityCreationForm from './ActivityCreationForm';
import './activities.css';

const Activities = ({isLoggedIn}) => {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({});

    useEffect(async () => {
        setActivities( (await axios.get('https://fitnesstrac-kr.herokuapp.com/api/activities')).data);
    }, [newActivity])

    

    return <Router><div id="activities-div">
        <h1 className="tabs">
            <Link to="/activities">All Activities</Link>
            {isLoggedIn ? 
                <Link to="/activities/create">Create Activity</Link>
                : ''
            }
        </h1>
        {isLoggedIn ?
            <Route exact path="/activities/create" render={() => <ActivityCreationForm setNewActivity={setNewActivity} />} />
            :
            ''
        }
        
        <div id="activity-results">
            {/* reversed to show newest activities first */}
            {activities.reverse().map((activity, idx) => {
                return <SingleActivity activity={activity} key={idx}/>
            })}
        </div>
    </div></Router>
}




export default Activities;