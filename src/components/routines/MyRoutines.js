import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RoutineCreationForm from './RoutineCreationForm';
import SingleRoutine from './SingleRoutine';
import './myroutines.css'

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api'

const MyRoutines = ({isLoggedIn}) => {

    const [routines, setRoutines] = useState([]);
    
    const [activities, setActivities] = useState([]);

    useEffect(async () => {
        setActivities( (await axios.get(`${BASE_URL}/activities`)).data);
    }, []);

    useEffect(async () => {
        setRoutines( (await axios.get(`https://fitnesstrac-kr.herokuapp.com/api/users/${localStorage.getItem("username")}/routines`,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("userToken")
            }
        })).data)
    }, [])

    return <>{isLoggedIn ? 
        <Router>
            <h1 className="tabs">
                <Link to="/myroutines">My Routines</Link>
                <Link to="/myroutines/create">Create Routine</Link>
            </h1>
            <Route exact path="/myroutines/create" render={() => <RoutineCreationForm 
                setRoutinesToDisplay={setRoutines} 
                routinesToDisplay={routines}
                activities={activities}
                setActivities={setActivities}/>} />
            <div id="routines-display">
                {(routines.length > 0) ? routines.map((routine, idx) => {
                    return <SingleRoutine routine={routine} key={idx} editable={true} activities={activities}/>
                }) : ''}
            </div>
        </Router>
        :
        <p>You must be logged in to view your routines.</p>
    }</>
}

export default MyRoutines;