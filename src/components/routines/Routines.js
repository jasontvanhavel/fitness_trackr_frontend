import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleRoutine from './SingleRoutine';

import './routines.css';



const Routines = () => {

    const [routines, setRoutines] = useState([]);

    useEffect(async () => {
        setRoutines( (await axios.get('http://fitnesstrac-kr.herokuapp.com/api/routines')).data);
    }, [])

    return <div id="routines-div">
        <h1>Routines</h1>

        <div id="routines-display">
            {routines.map((routine, idx) => {
                return <SingleRoutine routine={routine} key={idx} editable={false} activities={[]}/>
            })}
        </div>
    </div>
}

export default Routines;