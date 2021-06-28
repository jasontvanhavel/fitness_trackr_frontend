import axios from 'axios';
import React from 'react';

import './activityCreationForm.css';

const ActivityCreationForm = ({setNewActivity}) => {

    async function createActivity() {
        let activity = {
            name: document.getElementById("activity-name-input").value,
            description: document.getElementById("activity-description-input").value
        }

        try {
            await axios.post("http://fitnesstrac-kr.herokuapp.com/api/activities",
            {
                name: activity.name,
                description: activity.description
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("userToken")
                }
                
            });

            document.getElementById("response-message").innerHTML = "Activity succesfully created!";
            setNewActivity(activity);

        } catch (error) {
            if (error.response)
                document.getElementById("response-message").innerHTML = error.response.data.message;
            else 
                console.error(error);
        }
    }

    return <div id="creation-form">
        <div className="name-input">
            <label htmlFor="activity-name-input">Activity Name:</label>
            <input type="text" id="activity-name-input"></input>
        </div>
        <div className="description-input">
            <label htmlFor="activity-description-input">Description:</label>
            <input type="text" id="activity-description-input"></input>
        </div>
        <button onClick={() => createActivity()}>Create Activity</button>
        <p id="response-message"></p>
    </div>
}

export default ActivityCreationForm;