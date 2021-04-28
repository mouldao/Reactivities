import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
// import { Activity } from '../../../App/models/Activities';
import { useStore } from '../../../App/Stores/store';

const ActivityDetails = ()=>{
    const {activityStore} = useStore();
    const [target,setTarget] =  useState('');
    const {selectedActivity: activity, deleteActivity,loading,loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id:string}>();
    useEffect(()=>{
        if (id) loadActivity(id);
    },[id,loadActivity])
    function handleActivityDelete(e:React.SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name)
        // deleteActivity(id)
        deleteActivity(id)
    }
    if (loadingInitial || !activity) return <LoadingComponent/> ;
    // or activity?
    return(
        <Card fluid>
    <Image  src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span >J{activity.date}</span>
      </Card.Meta>
      <Card.Description>
       {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths='3'> 
            <Button as={Link} to={`/manage/${activity.id}`} basic color='blue'content='Edit'/>
            <Button 
                name={activity.id}
                loading={loading && target === activity.id}
                onClick={(e)=>handleActivityDelete(e,activity.id)}
                basic 
                color='red'
                content='Delete'/> 
            <Button as={Link} to="/activites" basic color='grey'content='Cancel'/>
           
            
        </Button.Group>
    </Card.Content>
  </Card>
    )
}

export default observer(ActivityDetails)