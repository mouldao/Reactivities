import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
// import { Activity } from '../../../App/models/Activities';
import { useStore } from '../../../App/Stores/store';
import ActivityDetailedChats from './ActivityDetailedChats';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivtyDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = ()=>{
     const {activityStore} = useStore();
    // const [,setTarget] =  useState('');
    // const {selectedActivity: activity, deleteActivity,loadActivity, loadingInitial} = activityStore;
        const {selectedActivity: activity,loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();
    useEffect(()=>{
        if (id) loadActivity(id);
    },[id,loadActivity])
    if (loadingInitial || !activity) return <LoadingComponent/> ;
    // or activity?
    return(
        <Grid>
            <Grid.Column width={"10"}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo  activity={activity}/>
                <ActivityDetailedChats />
            </Grid.Column>
              <Grid.Column width={"6"}>
                <ActivtyDetailedSidebar/>
              </Grid.Column>
        </Grid>
//         <Card fluid>
//     <Image  src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
//     <Card.Content>
//       <Card.Header>{activity.title}</Card.Header>
//       <Card.Meta>
//         <span >J{activity.date}</span>
//       </Card.Meta>
//       <Card.Description>
//        {activity.description}
//       </Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//         <Button.Group widths='3'> 
//             <Button as={Link} to={`/manage/${activity.id}`} basic color='blue'content='Edit'/>
//             <Button 
//                 name={activity.id}
//                 loading={loading && target === activity.id}
//                 onClick={(e)=>handleActivityDelete(e,activity.id)}
//                 basic 
//                 color='red'
//                 content='Delete'/> 
//             <Button as={Link} to="/activites" basic color='grey'content='Cancel'/>
           
            
//         </Button.Group>
//     </Card.Content>
//   </Card>
    )
}

export default observer(ActivityDetails)