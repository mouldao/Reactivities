// import React, { Fragment, useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import {  Container } from 'semantic-ui-react';
import { Activity } from '../models/Activities';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dasboard/ActivityDashboard';
// import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
// import moment from 'moment'
// import { Map , List, fromJS} from 'immutable';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../Stores/store';
import { observer } from 'mobx-react-lite';
function App() {
const [activities, setActivities] = useState<Activity[]>([])
 const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
// const [editMode,setEditMode] = useState(false);
// const [loading,setLoading] = useState(true);
const [submitting,setSubmitting] = useState(false);
const {activityStore} = useStore()

// function handleSelectActivity(id:string){
//     setSelectedActivity(activities.find(x=> x.id === id))
//     setEditMode(false)
// }
// function handleCancelSelectActivity (){
//     setSelectedActivity(undefined)
// }

// function handleFormOpen(id?:string){
//     id ? handleSelectActivity(id) : handleCancelSelectActivity();
//     setEditMode(true)
// }

// function handleFormClose(){
//     setEditMode(false)
// }

// function handleCreateOrEditActivity(activity: Activity){
// setSubmitting(true);
// if (activity.id){
//     agent.Activities.update(activity).then(()=>{
//         setActivities([...activities.filter(item=> activity.id !== item.id), activity])
//         setEditMode(false);
//         setSelectedActivity(activity);
//         setSubmitting(false)
//     })
// }else{
//     activity.id = uuid();
//     agent.Activities.create(activity).then(()=> {
//         setActivities([...activities,activity])
//         setEditMode(false);
//         setSelectedActivity(activity);
//         setSubmitting(false)
//     })
// }
//     // activity.id ? setActivities([...activities.filter(item=> activity.id !== item.id), activity])
//     //  :setActivities([...activities,{...activity, id:uuid()}])
//     // setEditMode(false);
//     // setSelectedActivity(activity);
// }

// function handleDeleteActivity(id:string){
//      setSubmitting(true)
//     agent.Activities.delete(id).then(()=>{
//    setActivities([...activities.filter(item=> item.id != id)])
//     setSelectedActivity(undefined)
//     setSubmitting(false)
//     })
//     }

    useEffect(()=>{
        activityStore.loadActivites();
        // agent.Activities.list().then(response => {

        // let activities: Activity[] = [];
        // response.forEach(activity => {
        //     activity.date = activity.date.split('T')[0]
        //     activities.push(activity);
        // })
        // setActivities(activities)
        // setLoading(false)
        // // let formattedResponse = fromJS(response)
        // // formattedResponse = formattedResponse.update(
        // // function(item:any) {
        // // return item.set("date",  moment(item.get("date"),"YYYY-MM-DD").format("DD/MM/yyy") );
        // // }); 
        // // const updateActivities = formattedResponse.toJS();
        // // setActivities(updateActivities)
        //     })
    },[activityStore])

if (activityStore.loadingInitial){ return <LoadingComponent content="Loading APPS" inverted={false}/>}
  return (
    // <Fragment >
    <>
         <NavBar />
         {/* <NavBar openForm={handleFormOpen}/> */}
        <Container style={{marginTop:"7em"}}>
            {/* <h2>{activityStore.title}</h2>
            <Button content="activity store test" positive onClick={activityStore.setTitle}/> */}
          <ActivityDashboard/>
          {/* <ActivityDashboard 
            activities={activityStore.activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit= {handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting = {submitting}
            
        /> */}
        </Container>
    </>
    // {/* </Fragment> */}
  );
}

export default observer(App);
