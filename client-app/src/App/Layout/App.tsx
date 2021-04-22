import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../modules/Activities';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
function App() {
const [activities, setActivities] = useState<Activity[]>([])
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
const [editMode,setEditMode] = useState(false);
function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=> x.id === id))
    setEditMode(false)
}
function handleCancelSelectActivity (){
    setSelectedActivity(undefined)
}

function handleFormOpen(id?:string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true)
}

function handleFormClose(){
    setEditMode(false)
}

function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(item=> activity.id !== item.id), activity])
     :setActivities([...activities,{...activity, id:uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
}

function handleDeleteActivity(id:string){
    setActivities([...activities.filter(item=> item.id != id)])
    setSelectedActivity(undefined)
}

    useEffect(()=>{
        axios.get<Activity[]>("http://localhost:5000/api/activities").then(result => setActivities(result.data))
    },[])

  return (
    // <Fragment >
    <>
         <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop:"7em"}}>
          <ActivityDashboard 
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit= {handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
            
        />
        </Container>
    </>
    // {/* </Fragment> */}
  );
}

export default App;
